import { Typography } from 'antd'
import React from 'react'
import Navbar from '../Navbar/Navbar'


function Loginhome() {
  return (
    <div>
     <Navbar isLoggedInPage={true} />
     <Typography>
         Welcome to the Login Page. Please click on the login button to access your account and book appointments with our doctors. We are here to provide you with the best healthcare services. Thank you for choosing us!
        </Typography>
       
    </div>
  )
}

export default Loginhome
