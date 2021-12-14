import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
// import Menu from '../Components/Menu';
require('../Components/Payment.css')
require('../Components/Help.css')


const Help = () => {
   
    const { regno } = useParams();
    console.log(regno)


    


    return (
        <>

            <div className="student" style={{ position: "relative" }}>
                <div className="container-fluid nav-bg" >
                    <div className="row">
                        <div className="col-12 mx-auto">
                            <div className="row ">
                                <div className="col-md-3 pt-3 order-2 order-lg-1" style={{ height: "100%" }}>
                                    <div className="menu-option" style={{ border: "3px solid black", boxShadow: "-2px 0 5px black" }} >
                                        <Link to={`/studentdetails/${regno}`} style={{ color: "white", textDecoration: "none", fontFamily: "monoscape", fontSize: "25px", display: "block", padding: "10px", textAlign: "center" }}>Student Details</Link><br />
                                        <Link to={`/payment/${regno}`} style={{ color: "white", textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", padding: "10px", textAlign: "center" }}>Pay Fee</Link><br />
                                        <Link to={`/help/${regno}`} style={{ color: "white", backgroundColor: "blue", textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", padding: "10px", textAlign: "center" }}>Help</Link><br />
                                        <Link to='' style={{ textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", paddingTop: "10px", textAlign: "center" }}></Link><br />
                                        <Link to='' style={{ textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", paddingTop: "10px", textAlign: "center" }}></Link><br />
                                        <Link to='' style={{ textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", paddingTop: "10px", textAlign: "center" }}></Link><br />
                                        <Link to='' style={{ textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", paddingTop: "10px", textAlign: "center" }}></Link><br />
                                        <Link to='' style={{ textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", paddingTop: "10px", textAlign: "center" }}></Link><br />

                                    </div>
                                </div>

                                <div className="col-md-4 pt-3 pt-lg-2 order-3 order-lg-2" style={{ height: "100%" }}>
                                    <div className="loan-options">
                                        <h2 className = "loan-hed">Through Loan</h2>
                                        <h4 className="what-head">What to do ???</h4>

                                        <ul style={{ listStyle: "square" ,fontFamily:"sans-serif" }}>
                                            <li>Enter the transaction number of your payment</li>
                                            <li>Fill the account number</li>
                                            <li>Fill the IFSC code</li>
                                            <li>Enter your bank name in which your account is.</li>
                                            <li>Enter the date of the fees payment</li>
                                            <li>Enter the Bank Account Holders Name and the respective email id.</li>
                                        </ul>
                                        <h6 style={{paddingTop :"30px" ,fontSize:"15px" , fontWeight:"bold" , textShadow:"" , fontFamily:"monospace"}}>**Select the Option only if you are not using Online Mode and paying the fees directly to NIT JSR , and fill the details correctly in order to verify..</h6>
                                    </div>
                                </div>

                                <div className="col-md-4 pt-3 pt-lg-2 order-4 order-lg-3" style={{ height: "100%" }}>
                                    <div className="online-option">
                                        <h2 className="loan-hed">Through Online Mode</h2>
                                        <h4 className="what-head">What to do ???</h4>
                                            <span>
                                                <p style = {{fontFamily:"sans-serif"}}>
                                                    This option provides you to pay your fees online.<br/>
                                                    You can Pay your fees by selecting the favourable option according to your comfort.<br/>
                                                    You can choose any mode of payment and Pay it. <br/>( Payment Mode :- <strong style = {{textDecoration : "none " , color : "antiquewhite"}}>UPI , Card Payment , Net Banking</strong> ).

                                                </p>
                                            </span>
                                       
                                        <h6 style={{paddingTop :"30px",fontSize:"15px"  , fontWeight:"bold" , textShadow:"" , fontFamily:"monospace"}}>**Select the Option only if you are paying the fees using Online Mode..</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="notice">

                    </div>
                </div>
            </div>
        </>
    );
};

export default Help