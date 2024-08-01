const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  username: {
    type: String,
    trim: true,
    min: 3,
    max: 20
  },

  nationalCode: {
    type: String,
    trim: true,
    min: 10,
    max: 10
  },
  gender: {
    type: String,
  },
  city: {
    type: String,
  },
  province: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /09\d{9}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "owner phone number required"],
    unique: true,
  },
  avatar: {
    type: String,
    default: 'default.jpg'
  },
  role: {
    type: String,
    default: 'owner'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House',
    }
  ],
}, { timestamps: true });

ownerSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

ownerSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

ownerSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

ownerSchema.methods.correctPassword = async function (
  candidatePassword,
  ownerPassword
) {
  return await bcrypt.compare(candidatePassword, ownerPassword);
};

ownerSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

ownerSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;