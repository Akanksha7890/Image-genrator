import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1) 
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!input) return

    setLoading(true)
    try {
      const data = await generateImage(input) // generateImage se data object aaega
      if (data && data.success) {
     setImage(data.image || assets.sample_img_1) // ✅ correct field
// backend ke hisaab se path
        setIsImageLoaded(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
      
      {/* Image Container */}
      <div className='relative'>
        <img 
          src={image} 
          alt="AI Result" 
          className='max-w-sm rounded-lg shadow-lg' 
        />
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-[10s] ${loading ? 'w-full' : 'w-0'}`} />
        <p className={`text-center mt-2 text-gray-500 ${!loading ? 'hidden' : ''}`}>Loading.....</p>
      </div>

      {/* Input Section */}
      {!isImageLoaded && (
        <div className='flex w-full max-w-xl bg-[#454545] text-white text-sm p-1 mt-10 rounded-full shadow-xl'>
          <input
            onChange={e => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder='Describe what you want to generate'
            className='flex-1 bg-transparent outline-none ml-6 py-3 placeholder-gray-400'
          />
          <button 
            type='submit'
            className='bg-zinc-900 px-10 sm:px-14 py-3 rounded-full hover:scale-105 transition-all duration-300'
          >
            Generate
          </button>
        </div>
      )}

      {/* Buttons after generation */}
      {isImageLoaded && (
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p 
            onClick={() => { setIsImageLoaded(false); setInput(''); setImage(assets.sample_img_1) }} 
            className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:bg-gray-100 transition-all'
          >
            Generate Another
          </p>
          <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer hover:scale-105 transition-all'>
            Download
          </a>
        </div>
      )}
    </form>
  )
}

export default Result
