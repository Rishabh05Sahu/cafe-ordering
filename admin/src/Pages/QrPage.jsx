import React from 'react'
import logo from '../assets/logo.png'
import Sidebar from '../Components/Sidebar/Sidebar'
import TextField from '@mui/material/TextField';

const QrPage = () => {
  return (
    <div className='bg-yellow-100 h-screen flex-col '>
         <div className="flex items-center justify-between">
        <Sidebar />
        <h1 className="text-4xl">Generate QR</h1>
        <img
          className="h-24 rounded-full border-4 border-black mt-5 mr-7"
          src={logo}
          alt=""
        />
      </div>
      <TextField
          id="outlined-number"
          label="Number"
          type="number"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
    </div>
  )
}

export default QrPage
