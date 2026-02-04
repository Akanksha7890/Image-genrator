import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      let data

      if (state === 'Login') {
        const response = await axios.post(
          backendUrl + '/api/user/login',
          { email, password }
        )
        data = response.data
      } else {
        const response = await axios.post(
          backendUrl + '/api/user/register',
          { name, email, password }
        )
        data = response.data
      }

      if (data.success) {
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('token', data.token)
        setShowLogin(false)
      } else {
        toast.error(data.message)
      }

    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className='fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500 shadow-2xl w-96'>

        <h1 className='text-center text-2xl text-neutral-700 font-medium'>
          {state}
        </h1>
        <p className='text-sm text-center mb-8'>
          Welcome back! Please sign in to continue
        </p>

        {state !== 'Login' && (
          <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img width={20} src={assets.user_icon} alt="" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='outline-none text-sm w-full'
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img width={18} src={assets.email_icon} alt="" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='outline-none text-sm w-full'
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img width={14} src={assets.lock_icon} alt="" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='outline-none text-sm w-full'
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button className='bg-blue-600 w-full text-white py-2.5 rounded-full mt-6'>
          {state === 'Login' ? 'Login' : 'Create account'}
        </button>

        {state === 'Login' ? (
          <p className='mt-5 text-center text-sm'>
            Don’t have an account?{' '}
            <span onClick={() => setState('Sign Up')}
              className='text-blue-600 cursor-pointer underline'>
              Sign up
            </span>
          </p>
        ) : (
          <p className='mt-5 text-center text-sm'>
            Already have an account?{' '}
            <span onClick={() => setState('Login')}
              className='text-blue-600 cursor-pointer underline'>
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          className='absolute top-5 right-5 cursor-pointer w-3'
          alt="close"
        />
      </form>
    </div>
  )
}

export default Login
