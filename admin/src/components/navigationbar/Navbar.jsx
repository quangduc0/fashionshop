import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={navlogo} alt=""  />
            <p>HILL FASHION</p>
        </div>
        <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar