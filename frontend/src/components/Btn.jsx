import React from 'react'
import { motion } from "motion/react"
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Btn = () => {
const {user,setShowLogin} = useContext(AppContext)
  const navigate = useNavigate();
    const onClickHandler = () => {
        if(user){
            Navigate('/result')
        }else{
            setShowLogin(true)
        }
    }
  return (
    <div className='pb-1 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4l mt-4 font-semibold text-netural-800 py-6'>See the magic . Try it now!</h1>
        <motion.button onClick={onClickHandler} className=" inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500"
 whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    default: { duration: 0.5 },
    opacity: { delay: 0.8, duration: 1 }
    }}
        >Generate Images

   
    </motion.button>
    </div>
  )
}

export default Btn