// This file contains the connection between the database and the server . Here we are using database MONODB Atlas which is an online database.
const mongoose = require('mongoose')

const DB = "mongodb+srv://feeModule:feemodule@cluster0.8onxj.mongodb.net/Student_Detail?retryWrites=true&w=majority"
//connection with database using mongoose mongo
mongoose.connect(DB)
    .then(() => console.log("Connection Successful......"))
    .catch((err) => console.log(err));
