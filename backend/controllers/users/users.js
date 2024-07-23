const { StatusCodes } = require('http-status-codes');
const House = require("../../models/House")
const User = require("../../models/User")
const Booking = require("../../models/Booking")

exports.getMe = async (req, res) => {
    try {
        let user = await User.findById(req.user._id)
        if (user) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "کاربر پیدا شد",
                user: user
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "کاربر پیدا نشد"
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

// # description -> HTTP VERB -> Accesss
// # update user profile -> PUT -> user
exports.updateProfile = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                username: req.body.username,
                nationalCode: req.body.nationalCode,
                province: req.body.province,
                city: req.body.city,
                gender: req.body.gender,
            },
            { new: true }
        ).then((user) => {
            if (user) {
                res.status(StatusCodes.OK).json({
                    msg: 'کاربر ویرایش شد',
                    user,
                })
            }
        }).catch((error) => {
            console.log(error);
            res.status(StatusCodes.BAD_REQUEST).json({
                msg: "پروفایل ویرایش نشد",
                error: error
            })
        })
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "خطای داخلی سرور",
            error: error
        })
    }
}

// # description -> HTTP VERB -> Accesss
// # update user avatar -> PUT -> user
exports.updateAvatar = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                avatar: req.file.filename,
            },
            { new: true }
        ).then((user) => {
            if (user) {
                res.status(StatusCodes.OK).json({
                    msg: 'آواتار کاربر ویرایش شد',
                    user,
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(StatusCodes.BAD_REQUEST).json({
                msg: 'آواتار کاربر ویرایش نشد',
                err,
            })
        })
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "خطای داخلی سرور",
            error: error
        })
    }
}

exports.getHouses = async (req, res) => {
    try {
        let houses = await House.find({})
        if (houses.length > 0) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "خانه ها پیدا شدند",
                count: houses.length,
                houses: houses
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "خانه ها پیدا نشدند"
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

exports.getHouse = async (req, res) => {
    try {
        let house = await House.findById(req.params.houseId)
        if (house) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "خانه پیدا شد",
                house: house
            })
        } else {
            return res.status(400).json({
                status: 'failure',
                msg: "خانه پیدا نشد"
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

exports.searchHouses = async (req, res) => {
    let { city, checkIn, checkOut, guests } = req.body

    try {
        let houses = await House.find({})

        let findHouses = []

        for (let i = 0; i < houses.length; i++) {
            if (houses[i].city === city) {
                findHouses.push(houses[i]);
            }
        }


        if (findHouses.length > 0) {
            res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "اقامتگاه پیدا شد",
                count: findHouses.length,
                houses: findHouses
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "اقامتگاهی یافت نشد",
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

exports.bookHouse = async (req, res) => {

    try {
        let house = await House.findOne({ _id: req.body.house })
        let checkInMounth = new Date(req.body.checkIn).toLocaleDateString().split('/')[0]
        let checkInDay = new Date(req.body.checkIn).toLocaleDateString().split('/')[1]

        let checkOutMounth = new Date(req.body.checkOut).toLocaleDateString().split('/')[0]
        let checkOutDay = new Date(req.body.checkOut).toLocaleDateString().split('/')[1]

        let countDays = 0;

        // switch (checkOutMounth) {
        //     case 1:
        //         countDays = 
        //         break;

        //     case 2:
        //         break;

        //     case 3:
        //         break;

        //     case 4:
        //         break;

        //     case 5:
        //         break;

        //     case 6:
        //         break;

        //     case 7:
        //         break;

        //     case 8:
        //         break;

        //     case 9:
        //         break;

        //     case 10:
        //         break;

        //     case 11:
        //         break;

        //     case 12:
        //         break;

        //     default:
        //         break;
        // }


        // console.log("checkInMounth: ",checkInMounth);
        // console.log("checkOutMounth: ",checkOutMounth);
        // console.log("checkInDay: ",checkInDay);
        // console.log("checkOutDay: ",checkOutDay);


        // if (house) {
        //     let newBooking = await Booking.create({
        //         user: req.user._id,
        //         owner: house.owner,
        //         house: house._id,
        //         price: house.price * (req.body.checkOut - req.body.checkIn) * (req.body.guests),
        //         checkIn: req.body.checkIn,
        //         checkOut: req.body.checkOut,
        //         guests: req.body.guests,
        //     })

        //     if (newBooking) {
        //         res.status(StatusCodes.CREATED).json({
        //             status: 'success',
        //             msg: "اقامتگاه رزرو شد",
        //             booking: newBooking
        //         });
        //     } else {
        //         res.status(StatusCodes.BAD_REQUEST).json({
        //             status: 'failure',
        //             msg: "اقامتگاه رزرو نشد",
        //         });
        //     }
        // }
        // else{
        //     res.status(StatusCodes.NOT_FOUND).json({
        //         status: 'failure',
        //         msg: "اقامتگاه پیدا نشد",
        //     }); 
        // }


    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

exports.notifications = (req, res) => {
    res.send("user notifications")
}

exports.finance = (req, res) => {
    res.send("user finance")
}

exports.myTickets = (req, res) => {
    res.send("user my tickets")
}

exports.createTicket = (req, res) => {
    res.send("user create tickets")
}

exports.addFavourite = (req, res) => {
    res.send("user add favourite")
}

exports.myFavourites = (req, res) => {
    res.send("user my favourites")
}


exports.myFavourites = (req, res) => {
    res.send("user my favourites")
}

exports.myBookings = (req, res) => {
    res.send("user my bookings")
}


