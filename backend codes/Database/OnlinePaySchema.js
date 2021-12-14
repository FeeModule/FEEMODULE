//This is the Online Pay Data Schema for holding the data for the online pay

const mongoose = require('mongoose')

const paySchema = new mongoose.Schema({
    Registration_Id : {
        type : String ,
        uppercase : true ,

    } ,
    Student_Name : {
        type : String ,
        uppercase : true ,
    },

    Course : {
        type : String ,
        uppercase : true ,
    },

    Semester : {
        type : Number ,
    },

    Fee_Status : {
        type : String ,
        require : true ,
    },

    Amount : {
        type : String ,
        require : true ,
    },

    Receipt_Id : {
        type : String ,
        uppercase : true ,
    },

    Payment_Id : {
        type : String ,
        uppercase : true ,
    },

    Order_Id : {
        type : String ,
        uppercase : true ,
    },
    
    Payment_Method : {
        type : String,

    } , 
    
    Card_Id :String,
    Bank:String,
    Wallet:String,
    VPA : String,
    Email: {
        type : String,
        require : true ,
    } ,
    Contact: String,

    Payment_Date:{
        type:String,
        
    }
});

const payData = new mongoose.model('PAYDATA' , paySchema)
module.exports = payData