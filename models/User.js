var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectID = mongoose.Schema.ObjectId;
var uuid     = require('uuid');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password: String,
    Contact: String,
    UserType: Number,
    FullName: String,
    Location: String,
    FavouriteTeam: String,
    Creation_Date: Date,
});

UserSchema.pre('save', function (next) {
    var user = this;
    console.log("25 ",user);
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.Password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.Password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.Password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
