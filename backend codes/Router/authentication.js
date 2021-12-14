const express = require('express')
const router = express.Router()
const fs = require('fs')
const moment = require('moment')
const PDFDocument = require('pdfkit')
const uniqueid = require('uniqid')
const Razorpay = require('razorpay')
const jwt = require('jsonwebtoken')
//exporting the connection 
require('../Database/connection')
require('../middleware/authenticate')
//if there is any schema export it 
const User = require('../Database/StudentSchema')
const loanDetail = require('../Database/LoanSchema')
const payData = require('../Database/OnlinePaySchema')


const bodyParser = require('body-parser')
// const cors = require("cros")
const recid = uniqueid()

router.use(bodyParser.json())

// welcome message to the sever port indicating server is running fine on the port
router.get('/', async (req, res) => {
    try {
        res.send("Hello there , this is the Server talking to you .....")
    }
    catch (err) {
        console.log(err)
    }
})


//this section will validate the user entered registration number's
router.post('/', async (req, res) => {
    try {
        let token;
        //getting the data from the user
        const { Registration_Number, DOB } = req.body;

        //validating the value we recieved
        if (!Registration_Number) {
            console.log("Invalid Registraion Number. Please enter the Registration number.")
            return res.status(422).json({ error: "No Data , Please fill the Registraion Number..." })
        }
        else if (!DOB) {
            console.log("Invalid DOB. Please Enter it properly")
            return res.status(422).json({ error: "No Data , Please fill the DOB..." })
        }

        //checking the inputed Registration Number with the Database Registration Number
        const studentData = await User.findOne({ Registration_Number: Registration_Number, DOB: DOB })

        // console.log(studentData)
        if (!studentData) {
            console.log("Can't Find The Registration Number with the Specified DOB . Please Try Again.....")
            res.status(400).json({ message: "Couldn't find the registration number with the Specified DOB" })
        }

        else {

            res.status(200).json({ message: "Found" })
            token = await studentData.generateAuthToken();
            // console.log(token);

            res.cookie = ("feemoduletoken", token, {
                expires: new Date(Date.now() + 300000), httpOnly: true
            });
        }


        // To add a document in the collection uncomment both the line and use postman or any interface and enter the data while refering to the StudentSchema.js
        // const user =  new User( req.body )
        // user.save().then( () => res.status(201).json({message : "Entry Done"})).catch((err) => res.status(400).send(err))

    } catch (error) {
        console.log(error);
        res.status(404)
    }
})


//After registration validation page for the user server request handling
router.get("/validation/:regno", async (req, res) => {
    try {
        const stureg = req.params.regno;
        // console.log(stureg)
        if (!stureg) {
            res.status(404).json({ message: "Page not found" });
        }

        const studentData = await User.findOne({ Registration_Number: stureg })

        console.log(`this is student data ${studentData}`)
        res.send(studentData)


    } catch (error) {
        console.log(error)
        res.status(404)
    }


})

//This request is for showing the students primary details 
router.get('/studentdetails/:regno', async (req, res) => {
    try {
        const sturegno = req.params.regno;
        console.log(sturegno)

        if (!sturegno) {
            res.status(404).json({ message: "Couldn't find the Data." })
        }

        const studentData = await User.findOne({ Registration_Number: sturegno })


        console.log(`this is data ${studentData}`)
        res.send(studentData)

    } catch (error) {
        console.log(error)
        res.status(404)
    }



})


// This router will handle the request from the client and store the details regarding the Loan Details
// This will fetch the details of the student for greeting purpose
router.get('/loan/:regno', async (req, res) => {
    try {
        const sturegno = req.params.regno;
        console.log(sturegno)

        if (!sturegno) {
            return res.status(404).json({ message: "Couldn't find the Data." })
        }

        const studentData = await User.findOne({ Registration_Number: sturegno })


        // console.log(`this is data ${studentData}`)
        res.send(studentData)

    } catch (error) {
        console.log(error)
        res.status(404)
    }
})

// This request will handle the data given by the student and store it into the database :- The loan-details section
router.post('/loan/:regno', async (req, res) => {
    try {

        const stureg = req.params.regno;
        const recid = uniqueid()
        //Requesting and getting the data from the frontend
        const { Registration_Number, Transaction_Id, Account_Number, IFSC, Bank_Name, Account_Holder_Name, Email_Id, DOP } = req.body;

        // console.log(Registration_Number);
        //Checking if any of them is null or not 
        if (!Registration_Number || !Transaction_Id || !Account_Number || !IFSC || !Bank_Name || !Account_Holder_Name || !Email_Id || !DOP) {
            return res.status(422).json({ message: "Data is missing" })
        }

        //else storing the data to the database 
        const loanData = new loanDetail({ Receipt_Id: recid , Registration_Number, Transaction_Id, Account_Number, IFSC, Bank_Name, Account_Holder_Name, Email_Id, DOP });

        loanData.save().then(() => {
            res.status(201).json({ message: "Data Entered" })
            console.log("Got it");
        }).catch((error) => {
            res.status(422).json({ message: "Data Missing" })
            console.log(error)
        })




        // //To add a document in the collection using the API or Postman
        // const loanData = new loanDetail( req.body )
        // loanData.save().then( () => res.status(201).json({message : "Entry Done"})).catch((err) => console.log(err))

    }
    catch (error) {
        console.log(error)
        res.status(404)
    }
})


router.get(`/online/:regno`, async (req, res) => {
    const stureg = req.params.regno;

    //getting the data from the backend for the student
    if (!stureg) {
        return res.status(422).json({ message: err })
    }

    const stuData = await User.findOne({ Registration_Number: stureg })

    if (!stuData) {
        return res.status(422).json({ message: "Data not found" })
    }

    res.send(stuData)

})


//razorpay order generation for the online 
const instance = new Razorpay({
    key_id: 'rzp_test_bTb5s75EYaX377',
    key_secret: 'd947St3TihX7ITQdhD79ksMv',
});


router.get(`/onlinepay/:regno/:name/:email/:contact`, async (req, res) => {
    const stureg = req.params.regno;
    const email = req.params.email;
    const contact = req.params.contact

    console.log(stureg, email, contact)

    const options = {
        amount: 5007500,  // amount in the smallest currency unit paisa
        currency: "INR",
        receipt: recid,
        notes: {
            "RegNo": `${stureg}`
        },

    };

    instance.orders.create(options, function (err, order) {
        if (err) {
            return res.status(500).json({ message: err })
        }

        res.json(order)
    });



})

//call back url
router.post(`/pay/verification`, async (req, res) => {
    //do the payment validation
    const secret = 'thisisfeemodule'
 

    //creating the hash
    const crypto = require('crypto')

    const paystatus = crypto.createHmac('sha256', secret)
    paystatus.update(JSON.stringify(req.body))
    const digest = paystatus.digest('hex')

    console.log(digest, req.headers['x-razorpay-signature'])


    if (digest === req.headers['x-razorpay-signature']) {
        let stuName, stuDep, stuSem, feestatus
        const roll = req.body.payload.payment.entity.notes.RegNo
        console.log(roll)
        //fetching the student data from the Monogodb
        const resData = await User.findOne({ Registration_Number: roll })
        console.log(resData)

        try {
            stuName = resData.Student_Name
            stuDep = resData.Course
            stuSem = resData.Semester


        } catch (error) {
            console.log(error)
        }

        //fetching the payment details and storing in the respective variables
        const capture = req.body.payload.payment.entity.status

        if (capture === "captured") {
            feestatus = "Paid"
        }
        else {
            feestatus = "UnPaid"
        }

        console.log(stuName)

        const amount = req.body.payload.payment.entity.amount
        const feeamount = (amount / 100)                 //saved in the inr format

        const receiptid = recid
        const payid = req.body.payload.payment.entity.id
        const orderid = req.body.payload.payment.entity.order_id
        const paymentmethod = req.body.payload.payment.entity.method
        const bank = req.body.payload.payment.entity.bank
        const card = req.body.payload.payment.entity.card_id
        const vpa = req.body.payload.payment.entity.vpa
        const wallet = req.body.payload.payment.entity.wallet
        const email = req.body.payload.payment.entity.email
        const contactno = req.body.payload.payment.entity.contact
        const stdate = new Date().toLocaleString
        const date = moment().format("MM/DD/YYYY HH:mm:ss")
        const payresData = await new payData({ Registration_Id: roll, Student_Name: stuName, Course: stuDep, Semester: stuSem, Fee_Status: feestatus, Amount: feeamount, Receipt_Id: receiptid, Payment_Id: payid, Order_Id: orderid, Payment_Method: paymentmethod, Card_Id: card, Bank: bank, Wallet: wallet, VPA: vpa, Email: email, Contact: contactno, Payment_Date: date });
        console.log(payresData)
        payresData.save().then(() => {
            res.status(201).json({ message: "Data Entered" })
            console.log("Got it");
        }).catch((error) => {
            res.status(422).json({ message: "Data Missing" })
            console.log("Missing")
        })


    }


    else {
        res.status(422).json({ message: "Data Missing" })
    }


    res.status(200).json({ message: "got it" })
})


router.get('/paydetails/:id', async (req, res) => {
    const regno = req.params.id
    console.log("paydetials")
    console.log(regno)

    if (!regno) {
        return res.send(422).json({ messaage: "Invalid rollno" })
    }

    const onlinepaydetails = await payData.findOne({ Registration_Id: regno , Fee_Status : "Paid" })

    try {
        console.log(onlinepaydetails)
        res.status(200)
        res.send(onlinepaydetails)
    } catch (error) {
        console.log(error)
    }
})

router.get('/paydetail/:id', async (req, res) => {
    const regno = req.params.id
    console.log(regno)

    if (!regno) {
        return res.send(422).json({ messaage: "Invalid rollno" })
    }

    const onlinepaydetails = await payData.find({ Registration_Id: regno })

    try {
        console.log(onlinepaydetails)
        res.status(200)
        res.send(onlinepaydetails)
    } catch (error) {
        console.log(error)
    }
})

router.get('/pdf/:id', async (req, res, next) => {
    const regno = req.params.id
    console.log(regno)

    if (!regno) {
        return res.send(422).json({ messaage: "Invalid rollno" })
    }

    const pdfData = await payData.findOne({ Registration_Id: regno , Fee_Status : "Paid" })

    console.log(pdfData)

    //section for creating pdf
    const myDoc = new PDFDocument({
        bufferPages: true
    })

    let buffers = []
    myDoc.on('data', buffers.push.bind(buffers));
    myDoc.on('end', () => {
        let pdfDetails = Buffer.concat(buffers)
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(pdfDetails),
            'Content-Type': 'application/pdf',
            'Content-disposition': 'attachment;filename=receipt' + pdfData.Receipt_Id + '.pdf',
        })
            .end(pdfDetails)
    })

    myDoc.image(`./images/black-logo.png`, 30, 20, {
        fit: [150, 130],
        align: "left",
        valign: "top"
    })

    myDoc.font('Helvetica').fontSize(28).text("National Institute of Technology", 170, 50, {
        width: 400,
        align: "center"
    })

    myDoc.font('Helvetica').fontSize(28).text("Jamshedpur", 170, 80, {
        widht: 400,
        aligh: "center"
    })

    myDoc.moveTo(10, 150).lineTo(600, 150).stroke()
    myDoc.moveTo(10, 152).lineTo(600, 152).stroke()

    myDoc.font('Helvetica').fontSize(12).text("Student Name: " + pdfData.Student_Name, 40, 180);
    myDoc.font('Helvetica').fontSize(12).text("Registration Id :" + pdfData.Registration_Id, 40, 200);
    myDoc.font('Helvetica').fontSize(12).text("Payment Date : " + pdfData.Payment_Date, 40, 220);
    myDoc.font('Helvetica').fontSize(12).text("Standard/Course : " + pdfData.Course, 40, 240);
    myDoc.font('Helvetica').fontSize(12).text("Year/Semester : " + pdfData.Semester, 40, 260);
    
    // myDoc.font('Helvetica').fontSize(12).text("Registration Id : "+student_payment_records.roll, 40,280);
    myDoc.font('Helvetica').fontSize(12).text("Receipt Number : " + pdfData.Receipt_Id, 290, 180);
    myDoc.font('Helvetica').fontSize(12).text("Payment Id : " + pdfData.Payment_Id, 290, 200);
    myDoc.font('Helvetica').fontSize(12).text("Merchant Id : " + pdfData.Order_Id, 290, 220);

    myDoc.font('Helvetica').fontSize(12).text("Payment Method : " + pdfData.Payment_Method, 290, 240);
    myDoc.font('Helvetica').fontSize(12).text("Fee Amount : INR " + pdfData.Amount, 290, 260);
    myDoc.font('Helvetica').fontSize(12).text("Paid Amount  : INR " + pdfData.Amount, 290, 280);

    myDoc.moveTo(10, 300).lineTo(600, 300).stroke()
    myDoc.moveTo(10, 350).lineTo(600, 350).stroke()
    myDoc.moveTo(10, 550).lineTo(600, 550).stroke()
    myDoc.font('Helvetica-Bold').fontSize(12).text("Description : "+ pdfData.Semerster + " Fees ", 40, 320);
    myDoc.font('Helvetica-Bold').fontSize(12).text("Amount", 380, 320);
    myDoc.font('Helvetica-Bold').fontSize(12).text("Paid", 480, 320);
    myDoc.moveTo(360, 300).lineTo(360, 550).stroke()
    myDoc.moveTo(460, 300).lineTo(460, 550).stroke()

    myDoc.moveTo(10, 590).lineTo(600, 590).stroke()
    myDoc.font('Helvetica').fontSize(10).text("This is an electronically generated fee receipt, no signature required", 50, 600);
    myDoc.font('Helvetica').fontSize(10).text("Thanks for your payment.", 50, 610);

    myDoc.moveTo(10, 640).lineTo(600, 640).stroke()
    myDoc.font('Helvetica-Bold').fontSize(12).text("Total Fee", 40, 380).text(pdfData.Amount , 380, 380).text(pdfData.Amount , 480, 380);
    myDoc.end();


    
});



module.exports = router;
