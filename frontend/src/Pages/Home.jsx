import React from 'react'
import { useNavigate} from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

  return (

    <div className='flex items-center justify-center h-screen'>
       <button
       className='px-12 py-8 bg-orange text-white rounded-md text-3xl' onClick={() => navigate("/seat-no/1")}>Order Now</button>
    </div>
  )
}

export default Home
