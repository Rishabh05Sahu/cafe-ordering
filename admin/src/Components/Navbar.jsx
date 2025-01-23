import React from 'react'
import Sidebar from './Sidebar'
import logo from '../assets/logo.png'


const Navbar = () => {
  return (
    <div >
       <div className="flex items-center justify-between">
        <Sidebar />
        <h1 className="text-4xl">All Orders</h1>
        <img
          className="h-24 rounded-full border-4 border-black mt-5 mr-7"
          src={logo}
          alt=""
        />
      </div>
    </div>
  )
}

export default Navbar
