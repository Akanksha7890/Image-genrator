import React from 'react'
import { stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20 px-4">
      
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-center">
        How it works
      </h1>

      <p className="text-base sm:text-lg text-gray-600 mb-8 text-center">
        Transform Words Into Stunning Images
      </p>

      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="
              flex flex-col sm:flex-row 
              items-start sm:items-center 
              gap-4 sm:gap-6 
              p-4 sm:p-5 
              bg-white/20 shadow-md border 
              cursor-pointer 
              hover:scale-[1.02] 
              transition-all duration-300 
              rounded-xl
            "
          >
            <img
              src={item.icon}
              alt=""
              className="w-8 h-8 sm:w-10 sm:h-10"
            />

            <div>
              <h2 className="text-lg sm:text-xl font-medium">
                {item.title}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                {item.description}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Steps
