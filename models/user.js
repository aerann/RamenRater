const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

//adds on to our schema a username and password field
UserSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model('User', UserSchema); 
