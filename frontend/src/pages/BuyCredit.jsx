import React from 'react'
import { assets, plans } from '../assets/assets' // plans array assets se fetch karenge

const BuyCredit = () => {
  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>
      {/* Upper Tag */}
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6 text-gray-600 text-sm font-medium'>
        OUR PLANS
      </button>

      {/* Main Heading */}
      <h1 className='text-center text-3xl font-semibold mb-12'>Choose the plan</h1>

      {/* Plans Cards Container */}
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div key={index} 
               className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500 bg-opacity-80'>
            
            {/* Logo Icon */}
            <img width={40} src={assets.logo_icon} alt="" />
            
            {/* Plan Details */}
            <p className='mt-3 mb-1 font-semibold text-gray-800'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            
            {/* Pricing Section */}
            <p className='mt-6'>
              <span className='text-3xl font-medium text-gray-800'>${item.price}</span> / {item.credits} credits
            </p>

            {/* Get Started Button */}
            <button className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>
              {item.id === 'Business' ? 'Get started' : 'Get started'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyCredit