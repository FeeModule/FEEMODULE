
import React, { useState } from 'react'

import '../Components/home.css'
import './footer.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    const [Registration_Number, setRegistration_Number] = useState('')
    const [DOB, setDOB] = useState('')
    
    var urlRegno = btoa(Registration_Number);
    console.log(urlRegno);

    
    //will use fetch api to send to the backend and check the details
    // form sometimes by default itself so we must prevent it
    const isValid = async (event) => {
        event.preventDefault();


        //fetching the data
        const resData = await fetch('/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Registration_Number: Registration_Number,
                DOB: DOB
            })
        });

        //above is basically in pendng state we can get the data of the pending state by
        const data = await resData.json();
        //  console.log(data);
        //checking whether the data is correct or not
        if (resData.status === 400 || !data) {
            window.alert("Couldn't Verify the given Registration Number .\r\nPlease Check Your Data.");
            setDOB("")
            setRegistration_Number("")
        }

        else if (resData.status === 422 || !data) {
            window.alert("Detail is Missing.\r\nPlese fill the Details Properly..");
            setDOB("")
            setRegistration_Number("")
        }

        else {
            navigate(`/validation/${(urlRegno)}`)
        }

    }

    return (
        <>
            <section id="body-logo-header" className="">
                <div className="container nav-bg">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <div className="row">
                                <div className="col-md-6 pt-5 pt-lg-2 order-2 order-lg-1">
                                    <div className="clg-name-logo">
                                        <img src="clg-logo.png" alt="NIT JSR LOGO" className="clg-logo">
                                        </img>
                                    </div>

                                    <div className="clg-name">
                                        <h2 className="clg-name-eng">National Institute of Technology</h2>
                                        <h2 className="jsr-eng">Jamshedpur</h2>
                                        <br />
                                        <h2 className="clg-name-hin">राष्ट्रीय प्रौद्योगिकी संस्थान</h2>
                                        <h2 className="jsr-hin"> जमशेदपुर</h2>
                                    </div>
                                </div>

                                <div className=" content-box col-lg pt-5 pt-lg-3 order-3 order-lg-2 d-flex justify-content-center">
                                    <div className="search-area">
                                        <div className="search-container">
                                            <label className="search-heading">
                                                Registration Verification <br />(पंजीकरण सत्यापित करें)
                                            </label>
                                            <br />
                                            <form method="POST" className="search-form" id="form-input">
                                                <lable className="roll">Registration Number</lable><br />
                                                <input type="text" id="registrationNum" name="registrationNumber" className="roll-box" size={50} autoComplete="off" spellCheck="false"
                                                    value={Registration_Number} onChange={(event) => setRegistration_Number(event.target.value)}
                                                ></input><br />
                                                <label className="dob" >Date Of Birth</label><br />
                                                <input type="date" min='1990-01-01' name="dob" id="dob" className="dob-box" autoComplete="off"
                                                    value={DOB} onChange={(event) => setDOB(event.target.value)}
                                                ></input>
                                                <br /><br />
                                                <button type="submit" name="submit" value="Submit" className="btn btn-primary sub" onClick={isValid}>Verify</button>
                                                <button type="reset" className="btn btn-primary res" value="Reset" onClick={() => { setDOB(""); setRegistration_Number(""); }}>Reset</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    );
}

export default Home
