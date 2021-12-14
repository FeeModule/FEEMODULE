import React, { useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import image from '../images/clg-logo.png'
import blackimage from '../images/black-logo.png'
import '../Components/validation-page-navbar.css'

const OnlinePay = () => {
    const navigate = useNavigate()
    const [order, setOrder] = useState([])

    const { regno, name, email, contact } = useParams()
    const regnoUrl = atob(regno)
    const regemail = atob(email)
    const regcontact = atob(contact)
    const regname = atob(name)
    console.log(regnoUrl, regemail, regcontact)


  
    //loading script for the razorpay
    function loadScript(src) {
        console.log(2)
        return new Promise((resolve) =>{
            const script = document.createElement('script')
            script.src = src

            //if script load's successfully than
            script.onload = () => {
                resolve(true)
            }

            //else if any error occurs while loading
            script.onerror = () =>{
                resolve(false)
            }

            document.body.appendChild(script)
        })
    }

    //creating a devoloper variable to store the domain of the website
    const __DEV__ = document.domain === 'localhost'


    const Pay = async (event) => {
        event.preventDefault()
        let sig;
            const loadres = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
            
            if(!loadres){
                window.alert("Payment Failed . Are you offline ?")
                return
            }

            console.log(1)

            const options = {
                key : __DEV__ ? 'rzp_test_bTb5s75EYaX377' : 'Production_Key' ,
                currency : order.currency ,
                amount : order.amount ,
                order_id : order.id ,  //amount of the fee to be entered
                name : "NIT JSR" ,
                description :"Fee for Autumn Session" ,
                image : blackimage ,
                // callback_url : `/onlinepay/callback/${order.id}` ,
                handler : function(response){
                    var los = response.razorpay_payment_id
                    if(typeof los !== undefined ){
                        window.alert("Successfully Done!!!!")
                        navigate(`/paydetails/${regno}`)
                    }
                    else{
                        window.alert("Payment Unsuccessful.\r\nAre you online?\r\nDon't click back or Refresh the page?")
                        window.alert("Please try again.....")
                        navigate(`/studentdetails/${regno}`)
                    }
                     
                   
                },
                
                prefill : {
                    name : regname ,
                    email : regemail ,
                    contact : regcontact ,
                }
            }

            //creating the payment object
            const paymentObject =  new window.Razorpay(options)
            paymentObject.open()
            
           
            

    }

  
    

    const getUser = async (req , res) => {
        const resData = await fetch(`/onlinepay/${regnoUrl}/${regname}/${regemail}/${regcontact}`);
        setOrder(await resData.json())
    }

    
    useEffect(() => {
        // window.alert("Please Do Not refresh or Go Back !!")
        getUser() 
           
    }, [])

    return (
        <>
            <div className="container-fluid nav-bg" >
                <div className="row">
                    <div className="col-12 mx-auto">
                        <div className="row ">
                            <div className="col-md-3 pt-3 order-2 order-lg-1" style={{ height: "100%" }}>
                                <div className="menu-option" style={{ border: "3px solid black", boxShadow: "-2px 0 5px black" }} >
                                    <div className="clg-name-logo">
                                        <img src={image} alt="NIT JSR LOGO" className="clg-logo" style={{ display: "inherit" }}>
                                        </img>
                                    </div>

                                    <div className="clg-name">
                                        <h2 style={{ color: "white", fontSize: "18px", textAlign: "center", textShadow: "0px 0 2px yellow", paddingTop: "10px", fontFamily: "sans-serif" }}>National Institute of Technology</h2>
                                        <h2 style={{ color: "white", fontSize: "18px", textAlign: "center", textShadow: "0px 0 2px yellow" }}>Jamshedpur</h2>
                                        <br style={{ color: "white", fontSize: "18px", textAlign: "center", textShadow: "0px 0 2px yellow" }} />
                                        <h2 style={{ color: "white", fontSize: "18px", textAlign: "center", textShadow: "0px 0 2px yellow" }}>राष्ट्रीय प्रौद्योगिकी संस्थान</h2>
                                        <h2 style={{ color: "white", fontSize: "18px", textAlign: "center", textShadow: "0px 0 2px yellow" }}> जमशेदपुर</h2>
                                    </div>
                                    <br /><br />
                                </div>
                            </div>
                            <div className="content-box-stu col-md-4 pt-4 pt-lg-10 order-2 order-lg-1 justify-content-right" style={{ height: "100%" }} >
                                <div className="st-box" style={{ border: "0px solid black", height: "100%" }}>

                                    <label className="st_name" style={{ fontFamily: "monospace", fontSize: "20px", padding: "" }}>Registration Number </label>
                                    <input type="text" id="studentName" className="st-n" spellCheck="false" style={{ color: "##f5f6fa", fontWeight: "bold", fontSize: "15px", cursor: "not-allowed", borderBottom: "0px" }} value={regnoUrl} readonly size={50} autofill="false"></input>
                                    <br />
                                    <label className="st_name" style={{ fontFamily: "monospace", fontSize: "20px", paddingTop: "10px" }}>Student Name  </label>
                                    <input type="text" id="studentName" className="st-n" spellCheck="false" style={{ color: "#f5f6fa", fontWeight: "bold", fontSize: "15px", cursor: "not-allowed", borderBottom: "0px" }} value={regname} readonly size={50} autofill="false"></input>
                                    <br />
                                    <label className="st_name" style={{ fontFamily: "monospace", fontSize: "20px", paddingTop: "10px" }} >Merchant Id</label>
                                    <input type="text" id="studentName" className="st-n" spellCheck="false" style={{ color: "#f5f6fa", fontWeight: "bold", fontSize: "15px", cursor: "not-allowed", borderBottom: "0px" }} value={order.id} readonly size={50} autofill="false"></input>
                                    <br />
                                    <label className="st_name" style={{ fontFamily: "monospace", fontSize: "20px", paddingTop: "10px" }}>Fee Amount</label>
                                    <input type="text" id="studentName" className="st-n" spellCheck="false" style={{ color: "#f5f6fa", fontWeight: "bold", fontSize: "15px", cursor: "not-allowed", borderBottom: "0px" }} value={`₹  ${order.amount / 100} `} readonly size={50} autofill="false"></input>
                                    <br />


                                </div>
                            </div>

                            <div className="content-box-stu col-md-5 pt-3 pt-lg-10 order-3 order-lg-2 justify-content-right" style={{ height: "100%" }} >
                                <div className="st-box" style={{ border: "0px solid black", height: "100%" }}>

                                    { /* Fee Amount to be paid */}
                                    <label className="st_name" style={{ fontFamily: "monospace", fontSize: "20px", paddingTop: "10px" }}>Receipt Number</label>
                                    <input type="text" id="studentName" className="st-n" spellCheck="false" style={{ color: "#f5f6fa", fontWeight: "bold", fontSize: "15px", cursor: "not-allowed", borderBottom: "0px" }} value={order.receipt} readonly size={50} autofill="false"></input>

                                    <label className="st_name" style={{ fontFamily: "monospace", fontSize: "20px", paddingTop: "10px" }}>Date of Payment</label>
                                    <input type="text" id="studentName" className="st-n" spellCheck="false" style={{ color: "#f5f6fa", fontWeight: "bold", fontSize: "15px", cursor: "not-allowed", borderBottom: "0px" }} value={new Date().toLocaleString() + ""} readonly size={50} autofill="false"></input>
                                    <br />
                                    <label className="st_name" style={{ fontFamily: "monospace", fontSize: "20px", paddingTop: "10px" }}>Email-Id </label>
                                    <br />
                                    <input type="text" id="studentName" className="st-n" spellCheck="false" style={{ color: "##f5f6fa", fontWeight: "bold", fontSize: "15px", cursor: "not-allowed", borderBottom: "0px" }} value={regemail} readonly size={50} autofill="false"></input>

                                    <label className="st_name" style={{ fontFamily: "monospace", fontSize: "20px", paddingTop: "10px" }}>Mobile Number  </label>
                                    <input type="text" id="studentName" className="st-n" spellCheck="false" style={{ color: "#f5f6fa", fontWeight: "bold", fontSize: "15px", cursor: "not-allowed", borderBottom: "0px" }} value={regcontact} readonly size={50} autofill="false"></input>

                                    <br /> <br />
                                    <button type="submit" className="btn btn-primary submit" style={{ marginTop: "10px", paddingLeft: "20px", paddingRight: "20px" }} value="submit"
                                        onClick={Pay} 
                                    >Pay</button>




                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OnlinePay
