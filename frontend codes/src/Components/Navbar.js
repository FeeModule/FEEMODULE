import React from 'react';
import '../Components/validation-page-navbar.css'
const nitjsr_link = "http://nitjsr.ac.in/"

const Navbar = () => {
    return (
        <>
            <nav className="navbar" id = "nav">
                <div className="container">
                    
                    <h3 className="navbar-heading"> Fee Portal </h3>
                    <a className="navbar-brand" href={nitjsr_link} target="_blank">


                        <h6 className="navbar-clg-name" >
                            National Institute of Technology ,
                            <span>
                                &nbsp;Jamshedpur
                            </span>
                        </h6>

                        <h6 className="navbar-clg-name-800" >
                            NIT ,
                            <span>
                                &nbsp;JSR
                            </span>
                        </h6>
                    </a>
                </div>

            </nav>

        </>
    );
}

export default Navbar
