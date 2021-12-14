/*This the main page which will contribute to the structure of our web page.
 *Since we know that this module is product of MERN Technology and it is a single page website with multiple components.
 *This section is responsible for that components binding as a single page.
 *Each component get active when the function which is related to it is called.
*/

//importing the necessary files from Package.json and also importing the components from the respective pages

import React from 'react'
import Navbar from './Components/Navbar'
import Validation from './Components/Validation'
import Footer from './Components/footer'
import Home from './Components/Home'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Studetail from './Components/StudentDetails'
import Payment from './Components/Payment'
import Help from './Components/Help'
import Loan from './Components/Loan'
import Online from './Components/Online'
import OnlinePay from './Components/OnlinePay'
import PaymentConfirmation from './Components/PaymentConfirmation'




const App = () => {
  return (
    <>
      {/* Navbar and Footer will be common for all pages*/}
      <Navbar />
     
      
      <Routes>
        {/* components wrapped under Routes element 
          * Routes will help in the navigation among the components whenever the path specifies is called.
          * Exact keyword ensures that the path must be exactly same in order to open that component.
          * Since here in react we work with jsx so every thing which is not inbuilt must be parathesised and it is case sensitive to.
        */}
        <Route exact path="/" element={<Home />}></Route>

        <Route exact path="/validation/:regno" element={<Validation />}></Route>

        <Route exact path = '/studentdetails/:regno' element = {<Studetail/>} > </Route>

        <Route exact path = '/payment/:regno' element = {<Payment/>} > </Route>

        <Route exact path = '/loan/:regno' element = {<Loan/>} > </Route>

        <Route exact path = '/online/:regno' element = {<Online />} />
        
        <Route exact path = '/onlinepay/:regno/:name/:email/:contact' element = {<OnlinePay />} />

        <Route exact path = '/paydetails/:regno' element = { <PaymentConfirmation />} />

        <Route exact path = '/help/:regno' element = {<Help/>} > </Route>

      
      </Routes>

      <Footer />
    </>
  )
}

export default App
