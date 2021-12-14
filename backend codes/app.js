// This file is the main file which will be actually rendered 
const dotenv = require('dotenv');
dotenv.config({ path: process.cwd() + '/config.env' })
const express = require('express')
const app = express()
require('../server/Database/connection')
const port =  process.env.PORT || 8000


//razorpay important requires and imports
const bodyParser = require('body-parser')
// const cors = require("cros")

app.use(bodyParser.json())
// app.use(cros())


app.use(express.json())
//this line helps in routing in the server side 
app.use(require('../server/Router/authentication'))



app.listen(port , (req , res ) =>{
    console.log(`Server is Running on Port Number ${port}`)
})