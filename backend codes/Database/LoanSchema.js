//This file will contain the Loan details Schema to store the information the student provide

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


//creating the schema 
const loanSchema = new mongoose.Schema({
    Receipt_Id : {
        type : String ,
        required : true ,
        uppercase : true ,
    } ,


    Registration_Number: {
        type : String , 
        required : true , 
        uppercase : true ,
    },

    Transaction_Id : {
        type : String ,
        uppercase : true , 
        required : true ,
        unique : true ,
    } ,

    Account_Number : {
        type : Number ,
        required:true ,
        
    } ,

    IFSC : {
        type: String,
        uppercase: true,
        required: true
    },
    
    Bank_Name : {
        type: String,
        uppercase: true,
        required: true
    },

    Account_Holder_Name : {
        type: String,
        uppercase: true,
        required: true
    },

    Email_Id: {
        type: String,
        uppercase: true,
        required: true ,
        match: /.+\@.+\..+/ig ,
    },

    DOP : {
        type: String ,
        required : true
    }
})


const loanDetail = new mongoose.model('LOANDETAIL' , loanSchema)

module.exports = loanDetail