//This file creates the Student Data Schema
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

//Creating Schema
const userSchema = new mongoose.Schema({
    Registration_Number: {
        type: String,
        required: true,
        uppercase: true,
        unique: true

    },

    Student_Name: {
        type: String,
        required: true,
        uppercase: true
    },

    Father_Name: {
        type: String,
        required: true,
        uppercase: true
    },

    Mother_Name: {
        type: String,
        required: true,
        uppercase: true

    },

    DOB: {
        type: String,
        required: true    //yyyy-mm-dd format
    },

    Course: {
        type: String,
        uppercase: true,
        required: true
    },

    Batch: {
        type: String,
        required: true
    },

    Semester: {
        type: Number,
        required: true
    },

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

});

//we are working here with token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY , {expiresIn : "10 minutes"});
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const User = new mongoose.model('STUDENTPRIMARYDETAIL', userSchema);




module.exports = User;


