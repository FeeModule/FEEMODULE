import React from 'react'
import {Link} from 'react-router-dom'

const regno = "2020pgcaca55"

function Menu() {
    return (
        <>
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
    
                <Link class="nav-link active" id="pills-home-tab" data-toggle="pill"  role="tab" aria-controls="pills-home" aria-selected="true" to = {`/studentdetails/${regno}`}> Student Details</Link>
                
                <li class="nav-item">
                    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="./Payment" role="tab" aria-controls="pills-profile" aria-selected="false">Pay Fee</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="./Help" role="tab" aria-controls="pills-contact" aria-selected="false">Help</a>
                </li>
            </ul>
        </>
    )
}

export default Menu
