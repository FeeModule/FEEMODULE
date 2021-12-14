// Online-Pay details page

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import moment from "moment"
// date_create : moment().format("DD-MM-YYYY")
require('../Components/Online.css')


const Online = () => {
    const navigate = useNavigate()
    const { regno } = useParams()
    const regnoUrl = atob(regno)
    console.log(regno, " ", regnoUrl)
    const [user, setUser] = useState([])

    const [email, setEmail] = useState('')
    const [contactno, setContactNo] = useState('')
    const [DOP, setDOP] = useState('')

    const [payment , setPayment] = useState([])

    const date_create = new Date().toLocaleString() + ""

    const clear = () => {
        setEmail('')
        setContactNo('')
        setDOP(date_create)
    }


    const getUser = async () => {
        const resData = await fetch(`/online/${regnoUrl}`)

        setUser(await resData.json())

    }

    const isValid = (event) => {
        event.preventDefault();

        const name = btoa(user.Student_Name)
        const regemail = btoa(email)
        const regcontact = btoa(contactno)
        const regdop = btoa(DOP)
        // console.log(regdop , regcontact , regemail)

        var regcnt = /[1-9]{1}[0-9]/;
        var regem = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/ig;

        if (!regcontact || !regemail || !regdop) {
            window.alert("Details Missng. \r\nPlease Fill The Details Properly!!!")
            clear()
        }

        else if (!contactno.match(regcnt) || contactno.length > 10 || contactno.length < 10) {
            window.alert("Please Provide proper Contact Number")
            clear()
        }

        else if (!email.match(regem)) {
            window.alert("Email Id is not valid.\r\nPlease provide a valid email id..")
            clear()
        }

        else {

            navigate(`/onlinepay/${regno}/${name}/${regemail}/${regcontact}`)
        }
    }

    const redir = () => {
        var confirmation = window.confirm("Are you sure you want to stop the Payment Process ?")

        if (confirmation) {
            navigate('/')
        }

    }

    const getPayment = async () =>{
        const resData = await fetch(`/paydetail/${regnoUrl}`)
        setPayment(await resData.json())
    }




    useEffect(() => {
        window.alert('Fill the data Correctly !!!')
        setDOP(date_create)
        clear()
        getPayment()
        getUser()

        return () => {
            console.log("Loading..")
        }
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
                                        <h5 className="loan-h5">{user.Student_Name}</h5>


                                        <span className="span-loan">Reg. No.  </span>
                                        <h5 className="loan-h5" >{user.Registration_Number}</h5>


                                        <span className="span-loan">Course </span>
                                        <h5 className="loan-h5" >{user.Course}</h5>

                                        <span className="span-loan"> Semester </span>
                                        <h5 className="loan-h5">{user.Semester}</h5>
                                        <br />
                                        <br />



                                        <div className="notice">
                                            <h6 style={{ fontFamily: "monospace" }}>** Please fill the asked details correctly **  </h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="content-box-stu col-md-4 pt-3 pt-lg-10 order-3 order-lg-2 justify-content-right" style={{ height: "100%" }} >
                                    <div className="st-box" style={{ border: "0px solid black", height: "100%" }}>
                                        <form className="loan-form" method="POST" >
                                            <h1>
                                                Pay Online
                                            </h1>

                                            <label className="online-label"> Email - Id</label><br />
                                            <input type="text" className="online-input" autoComplete="off" name="email_id" size={30} spellCheck="false" required
                                                value={email} onChange={(event) => setEmail(event.target.value)}></input>
                                            <br />
                                            <label className="online-label"> Mobile Number</label><br />
                                            <input type="text" className="online-input" autoComplete="off" name="contact_no" size={30} spellCheck="false" required
                                                value={contactno} onChange={(event) => {
                                                    setContactNo(event.target.value);

                                                }}
                                            />
                                            <br />
                                            <label className="online-label"> Date of Payment </label><br />
                                            <input type="text" className="online-input" autoComplete="off" name="dop" size={30} spellCheck="false" readOnly required style={{ borderBottom: "0px" }}
                                                value={DOP} onChange={(event) => setDOP(event.target.value)}
                                            />

                                            <br /> <br />

                                        </form>
                                    </div>
                                    <span className='btns'>
                                        <button type="submit" name="submit" value="Submit" className="btn btn-primary submit" onClick={isValid}>Pay Now</button>
                                        <button type="reset" className="btn btn-primary reset" value="Reset" onClick={() => clear()} >Reset</button>
                                        <button className="btn btn-primary can" name="Loan" onClick={() => redir()}>Cancel</button>
                                    </span>
                                </div>

                                <div className="content-box-stu col-md-5 pt-3 pt-lg order-4 order-lg-3 justify-content-right" style={{ height: "100%" }} >
                                    <div className="st-box" style={{ border: "0px solid black", height: "100%" }}>
                                        <h1>
                                            Payments <span style = {{fontSize:"15px" , textAlign : "left" , color:"whitesmoke" , fontFamily:"sans-serif"}}>(This section shows previous payment done)</span>
                                        </h1>
                                        <table className = "table table-hovered">
                                            <thead>
                                                <tr itemScope='col'>
                                                    <th style = {{fontSize:"20px" , textAlign : "left" , color:"wheat" , fontFamily:"monospace"}}>Payment Id</th>
                                                    <th style = {{fontSize:"20px" , textAlign : "left" , color:"wheat" , fontFamily:"monospace"}}>Receipt Id</th>
                                                    <th style = {{fontSize:"20px" , textAlign : "left" , color:"wheat" , fontFamily:"monospace"}}>Status</th>

                                                </tr>
                                            </thead>
                                            {
                                                payment.map((pay) =>(
                                                    <tbody>
                                                        <tr>
                                                            <td style = {{fontWeight:"200" , color:"white", fontFamily:"Times New Roman"}}>{pay.Payment_Id}</td>
                                                            <td style = {{fontWeight:"200" , color:"white", fontFamily:"Roborto Mono"}}>{pay.Receipt_Id}</td>
                                                            <td style = {{fontWeight:"200" , color:"white", fontFamily:"Roborto Mono"}}>{pay.Fee_Status}</td>
                                                        </tr>
                                                    </tbody>
                                                )

                                                )
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="notice">
                                <h6>** Please fill the above <strong>Details</strong> correctly ** </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Online