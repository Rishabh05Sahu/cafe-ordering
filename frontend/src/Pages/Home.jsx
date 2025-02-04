import React from 'react'
import { useNavigate} from "react-router-dom";
import { motion } from "motion/react"
const Home = () => {

    const navigate = useNavigate();

  return (

    <div className='flex items-center justify-center h-screen'>
       <motion.button
       whileHover={{scale:1.2}}
       whileTap={{scale:0.8}}
       className='px-12 py-8 bg-orange text-white rounded-md text-3xl' onClick={() => navigate("/seat-no/1")}>Order Now</motion.button>
    </div>
  )
}

export default Home
