import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const {user,setShowLogin} = useContext(AppContext)
  const navigate = useNavigate();
    const onClickHandler = () => {
        if(user){
            navigate('/result')
        }else{
            setShowLogin(true)
        }
    }

  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20'
    initial={{opacity:0, y:-50}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5}}
    whileInView={{opactiy:1, y:0}}
    viewport={{once:true}}
    >
      
      <motion.div className='text-stone-500 inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
        <p className='text-sm font-medium'
        initial={{opacity:0, x:-20}}
      animate={{opacity:1, x:0}}
      transition={{duration:0.5, delay:0.5}}
       viewport={{once:true}}>

          Best text to image generator
        </p>
        <img src={assets.star_icon} alt="star" className='w-4' />
      </motion.div>

      <h1 className='text-5xl max-w-[500px] sm:text-8xl sm:max-w-[800px] mx-auto mt-10 text-center'>
        Turn text to <span className='text-blue-600'>image</span>,in seconds.
      </h1>
 <p className='text-center max-w-xl mx-auto mt-5'>An AI-powered platform that transforms your text into stunning images, offering speed, creativity, flexibility, and a seamless experience for all users.</p>
   <motion.button onClick={onClickHandler}
  className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full"
 whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    default: { duration: 0.5 },
    opacity: { delay: 0.8, duration: 1 }
  }}
>
  Generate Images
  <img className="h-6" src={assets.star_group} alt="stars" />
</motion.button>

    <div className='flex flex-wrap justify-center mt-16 gap-13'>
        {Array(6).fill('').map((item,index) => (
          <img className='rounded hover: scale-105 transition -all duration-300 cursor-pointer max:sw:w-10'
           src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} alt="placeholder" key={index} width={70} />
        ))}
    </div>
    <p className='text-center mt-8'>Generated Images from imagify</p>
    </motion.div>
    
  )
}

export default Header
