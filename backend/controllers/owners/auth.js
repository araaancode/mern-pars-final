const crypto = require('crypto');
const { promisify } = require('util');
const randKey = require("random-key");
const jwt = require('jsonwebtoken');
const Owner = require('../../models/Owner');
const OTP = require("../../models/OTP")
const { StatusCodes } = require("http-status-codes")

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};


const sendOTPCode = async (phone, owner, req, res) => {
    const code = randKey.generateDigits(5);
    let otp = await OTP.findOne({ phone })

    if (otp) {
        otp.code = code;
        otp.save().then((data) => {
            if (data) {
                res.status(StatusCodes.CREATED).json({
                    msg: "کد تایید ارسال شد",
                    data
                })
            }

        }).catch((error) => {
            console.log(error);
            res.status(StatusCodes.BAD_REQUEST).json({
                msg: "کد تایید ارسال نشد",
                error
            })
        })
    } else {
        let newOtp = await OTP.create({
            phone: phone,
            code
        })

        if (newOtp) {
            res.status(StatusCodes.CREATED).json({
                msg: "کد تایید جدید ساخته شد",
                code: newOtp
            })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                msg: "کد تایید ساخته نشد"
            })
        }

    }

};

const createSendToken = (owner, statusCode, statusMsg, msg, req, res) => {
    const token = signToken(owner._id);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    // Remove password from output
    owner.password = undefined;

    res.status(statusCode).json({
        status: statusMsg,
        msg,
        token,
        data: {
            owner
        }
    });
};

exports.register = async (req, res, next) => {

    try {
        let findOwner = await Owner.findOne({ phone: req.body.phone })

        if (findOwner) {
            res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "کاربر وجود دارد. وارد سایت شوید!",
            })
        } else {
            let newOwner = await Owner.create({
                phone: req.body.phone,
                password: req.body.password,
            })

            if (newOwner) {
                res.status(StatusCodes.CREATED).json({
                    status: 'success',
                    msg: "کاربر با موفقیت ثبت نام شد",
                    newOwner
                })
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }

}

exports.login = async (req, res, next) => {

    try {
        const { phone, password } = req.body;

        // 1) Check if phone and password exist
        if (!phone || !password) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                status: 'failure',
                msg: "همه فیلدها باید وارد شوند!",
            });
        }


        // 2) Check if owner exists && password is correct
        const owner = await Owner.findOne({ phone })


        if (!owner || !(owner.correctPassword(password, owner.password))) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                status: 'failure',
                msg: "پسورد نادرست است",
            });
        }

        // 3) If everything ok, send token to client
        // createSendToken(owner,StatusCodes.OK, 'success','با موفقیت وارد سایت شدید', req, res);
        if (owner) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "با موفقیت وارد سایت شدید",
                owner
            });
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "کاربر یافت نشد. باید ثبت نام کنید.",
            });
        }

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}



exports.sendOtp = async (req, res) => {
    try {
        let { phone } = req.body
        let owner = await Owner.findOne({ phone })

        await sendOTPCode(phone, owner, req, res)
        //  else {
        //   res.status(StatusCodes.BAD_REQUEST).json({
        //     msg: "کاربر یافت نشد",
        //   })
        // }
    } catch (error) {
        console.error(error.message);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //   status: 'failure',
        //   msg: "خطای داخلی سرور",
        //   error
        // });
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        let { phone, code } = req.body

        let ownerOtp = await OTP.findOne({ phone })
        let owner = await Owner.findOne({ phone })

        if (ownerOtp.code === code) {
            createSendToken(owner, StatusCodes.OK, 'success', 'کد تایید با موفقیت ارسال شد', req, res)
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                msg: "کد وارد شده اشتباه است!"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};


exports.forgotPassword = (req, res) => {
    res.send("owners forgot password")
}

exports.resetPassword = (req, res) => {
    res.send("owners reset password")
}

exports.changePassword = (req, res) => {
    res.send("owners change password")
}