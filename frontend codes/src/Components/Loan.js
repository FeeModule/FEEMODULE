// Loan details page

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
require('../Components/Loan.css')


const Loan = () => {
    const navigate = useNavigate()

    const [DOP , setDOP] = useState('')
    const [AccountNumber , setAccountNumber] = useState('')
    const [IFSC , setIfsc] = useState('')
    const [bankName , setBankName] = useState('')
    const [email , setEmail] = useState('')
    const [Transaction_Id , setTransaction_Id] = useState('')
    const [Account_Holder , setAccountHolder] = useState('')

    

    const [user, setUser] = useState([])
    const { regno } = useParams()
    console.log(regno)

    const regnoUrl = atob(regno)

    const clear = () =>{
        setDOP('');
        setTransaction_Id('');
        setBankName('')
        setEmail('')
        setAccountNumber('')
        setAccountHolder('')
        setIfsc('')
    }

    const getUser = async () => {

        const Data = await fetch(`/loan/${regnoUrl}`);
        // console.log(Data.json())
        setUser(await Data.json())
    }

    const isValid = async (event) => {
        event.preventDefault();
        
        //checks for the data entry
        var regifsc = /[A-Z]{4}0[A-Z0-9]{6}/ig;
        if(!IFSC.match(regifsc)){
            return window.alert("IFSC code entered is not valid.\r\nPlease enter valid IFSC code.")
        }
        
        var regem = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/ig;
        if(!email.match(regem)){
            return window.alert("Email Entered is not valid.\r\nPlease Enter a valid Email-Id")
        }

        var regname = /[a-zA-Z\s]/ig;
        if(!bankName.match(regname) || !Account_Holder.match(regname)){
            return window.alert("Fill the Bank Name and Account Holder's Name correctly.")
        }

        var regacc = /[0-9]/ig;
        if(!AccountNumber.match(regacc)){
            return window.alert("Account Number is invalid.\r\nPlease fill a valid Account Number")
        }

        //Posting the data got
        const resData = await fetch(`/loan/${regno}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Registration_Number: regnoUrl,
                Transaction_Id : Transaction_Id,
                Account_Number : AccountNumber,
                IFSC : IFSC ,
                Bank_Name : bankName , 
                Account_Holder_Name : Account_Holder ,
                Email_Id : email ,
                DOP : DOP 
                
            })
        });

        //above is basically in pendng state we can get the data of the pending state by
        const data = await resData.json();
        console.log(data);

        if( resData.status === 422 || !data ){
            window.alert("Detail is Missing.\r\nPlese fill the Details Properly..");
            clear()
        }
        else {
            window.alert("Details Have Been Recorded!!! \r\n Thank You!!!")
            clear()
            navigate(`/`)
        }
    }
    

    const redir = () => {
        var confirmation = window.confirm("Do you want to cancel the Payment Task ?")
        console.log(confirmation)
        if (confirmation) {
            navigate(`/`)
        }

        else {
            navigate(`/loan/${regno}`)
        }

    }

   

    useEffect(() => {
        window.alert("Please fill the details properly!!")
        clear()
        getUser()

    }, [])


    return (
        <>
            <div className="student" style={{ position: "relative" }}>
                <div className="container-fluid nav-bg" >
                    <div className="row">
                        <div className="col-12 mx-auto">
                            <div className="row ">
                                <div className="col-md-3 pt-3 order-2 order-lg-1" style={{ height: "100%" }}>
                                    <div className="menu-option" style={{ border: "3px solid black", boxShadow: "-2px 0 5px black" }} >
                                        <h3 className="heading"> Autumn Semester Fee </h3>
                                        <h4 className="hed-yr"> 2021 - 2022</h4>
                                        <span className="span-loan">Hello  </span>
                                        <h5 className = "loan-h5">{user.Student_Name}</h5>
                                        

                                        <span className="span-loan">Reg. No.  </span>
                                        <h5 className = "loan-h5" >{user.Registration_Number}</h5>
                                        

                                        <span className="span-loan">Course </span>
                                        <h5 className = "loan-h5" >{user.Course}</h5>
                                        
                                        <span className="span-loan"> Semester </span> 
                                        <h5 className="loan-h5">{user.Semester}</h5>
                                        <br />
                                        <br />
                                        


                                        <div className="notice">
                                            <h6 style={{ fontFamily: "monospace" }}>** Please fill the asked details correctly **  </h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="content-box-stu col-md-4 pt-3 pt-lg-10 order-4 order-lg-2 justify-content-right" style={{ height: "100%" }} >
                                    <div className="st-box" style={{ border: "0px solid black", height: "100%" }}>
                                        <form className="loan-form" method="POST" >
                                            <h1 className = "visible">
                                                Bank Details
                                            </h1>

                                            <label className="loan-label"> Transaction Id</label><br />
                                            <input type="text" className= "loan-input" autoComplete="off" name="Txn_id" size={30} spellCheck="false" required 
                                            value={Transaction_Id} onChange={(event) => setTransaction_Id(event.target.value)}></input>
                                            <br />
                                            <label className="loan-label"> Bank Account Number</label><br />
                                            <input type="text" className= "loan-input" autoComplete="off" name="Acc_no" size={30} spellCheck="false" required  
                                            value={AccountNumber} onChange={(event) => setAccountNumber(event.target.value)}
                                            />
                                            <br />
                                            <label className="loan-label"> IFSC code </label><br />
                                            <input type="text" className= "loan-input" autoComplete="off" name="ifsc" size={30} spellCheck="false" required 
                                            value={IFSC} onChange={(event) => setIfsc(event.target.value)}
                                            />
                                            
                                            <br /> <br />

                                        </form>
                                    </div>
                                    <span className = 'btns'>
                                    <button type="submit" name="submit" value="Submit" className="btn btn-primary submit" onClick={isValid}>Submit</button>
                                    <button type="reset" className="btn btn-primary reset" value="Reset" onClick = {() => clear()} >Reset</button>
                                    <button className="btn btn-primary can" name="Loan" onClick={() => redir()}>Cancel</button>
                                    </span>
                                </div>
                                <div className="content-box-stu col-md-4 pt-3 pt-lg-10 order-3 order-lg-3" style={{ height: "100%" }} >
                                    <div className="st-box" style={{ border: "0px transparent black", height: "100%" }}>
                                        <form className="loan-form" method="POST" >
                                           { /*<h1>&nbsp;</h1>*/}
                                           <h1 className = "hidden">
                                                Bank Details
                                            </h1>
                                            <label className="loan-label"> Bank Name </label><br />
                                            <input type="text" autoComplete="off" name="Txn_id" size={30} spellCheck="false" required 
                                            value={bankName} onChange={(event) => setBankName(event.target.value)}
                                            />

                                            <br />
                                            <label className="loan-label"> Account Holder's Name</label><br />
                                            <input type="text" autoComplete="off" name="Txn_id" size={30} spellCheck="false" required 
                                            value={Account_Holder} onChange={(event) => setAccountHolder(event.target.value)}
                                            />
                                            <br />
                                            <label className="loan-label"> Email-ID</label><br />
                                            <input type="email"  autoComplete="off" name="email" size={30} spellCheck="false" required 
                                            value={email} onChange={(event) => setEmail(event.target.value)}
                                            />
                                            <br />
                                            <label className="loan-label"> Date of Payment</label><br />
                                            <input type="date" autoComplete="off" name="DOP" size={30} spellCheck="false" required 
                                            value={DOP} onChange={(event) => setDOP(event.target.value)}>
                                            </input>
                                            
                                            
                                        </form>
                                    </div>


                                </div>

                            </div>
                            <br/>
                            <div className="notice">
                                <h6>** Please fill the above <strong>Bank Details</strong> correctly ** </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Loan