const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String
});

    userSchema.methods.encryptPassword = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
    };
    
    userSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    }

const User = mongoose.model('users', userSchema);

module.exports = User;
