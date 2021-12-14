import React, { useState , useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
// import Menu from '../Components/Menu';
require('../Components/Payment.css')


const Payment = () => {
    const navigate = useNavigate()
   
    const { regno } = useParams();
    console.log(regno)
    
    const regnoUrl = atob(regno)

    useEffect (()=>{
        window.alert("If you are paying fees Through Loan option.\r\nYou just need to Enter the Details Properly as mentioned...")

    },[] )

    const redir =() =>{
        var confirmation = window.confirm("Do you want to cancel the Payment Task ?")
        console.log(confirmation)
        if(confirmation){
            navigate(`/`)
        }

        else{
            navigate(`/studentdetails/${regno}`)
        }
    }

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
                                        <Link to={`/payment/${regno}`} style={{ color: "white", backgroundColor: "blue", textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", padding: "10px", textAlign: "center" }}>Pay Fee</Link><br />
                                        <Link to={`/help/${regno}`} style={{ color: "white", textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", padding: "10px", textAlign: "center" }}>Help</Link><br />
                                        <Link to={`/help`} style={{ textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", paddingTop: "10px", textAlign: "center" }}></Link><br />
                                        <Link to={`/help`} style={{ textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", paddingTop: "10px", textAlign: "center" }}></Link><br />
                                        <Link to={`/help`} style={{ textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", paddingTop: "10px", textAlign: "center" }}></Link><br />
                                        <Link to={`/help`} style={{ textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", paddingTop: "10px", textAlign: "center" }}></Link><br />
                                        <Link to={`/help`} style={{ textDecoration: 'none', fontFamily: "Roborto", fontSize: "25px", display: "block", paddingTop: "10px", textAlign: "center" }}></Link><br />

                                    </div>
                                </div>

                                <div className="col-md-9 pt-2 order-3 order-lg-2" style={{alignContent : "center"}}>
                                    <div className="loan-options">
    
                                        <h1 style = {{color: "#f5cd79" , paddingLeft : "50px " , paddingBottom : "20px"}}> Pay Fee </h1>
                                        <button className="loan-pay btn btn-primary" name = "Loan" onClick = {()=> navigate(`/loan/${regno}`)}>Through Loan</button>
                                        
                                        <button className="online-pay btn btn-primary" name = "Online" onClick = {()=> navigate(`/online/${regno}`)}>Through Online Mode</button>

                                        <button className="online-pay btn btn-primary" name = "Cancel" onClick = {()=> redir() }>Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="notice">
                        <h6>** Select an Approriate Option from the above options to continue further. ** </h6>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment