const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: [EMAIL_PATTERN, "Invalid email pattern"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      match: [PASSWORD_PATTERN, "Invalid password pattern"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
)

userSchema.pre('save', function(next) {
    const user = this

    if (!user.isModified('password')) {
        next()
    } else {
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => bcrypt.hash(user.password, salt)
                .then(hash => {
                    user.password = hash
                    next()
                })
            )
            .catch(next)
    }
})

userSchema.methods.checkPassword = function(password) { return bcrypt.compare(password, this.password) }

const User = mongoose.model('User', userSchema)

module.exports = User