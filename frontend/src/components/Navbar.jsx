import { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const { user, setShowLogin, logout, credit } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-between py-4'>
      <Link to='/'>
        <img
          src={assets.logo}
          alt="Logo"
          className='w-28 sm:w-32 lg:w-40'
        />
      </Link>

      <div>
        {user ? (
          <div className='flex items-center gap-2 sm:gap-3'>
            <button
              onClick={() => navigate('/buy-credit')}
              className='flex items-center gap-2 bg-blue-300 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 duration-500'
            >
              <img className='w-5' src={assets.credit_star} alt="" />
              <p className='text-xs sm:text-sm font-medium text-gray-600'>
                Credits left : {credit}
              </p>
            </button>

            <p className='text-gray-600 max-sm:hidden'>
              Hi, {user.name}
            </p>

            <div className='relative group'>
              <img
                src={assets.profile_icon}
                className='w-10 cursor-pointer drop-shadow'
                alt="profile"
              />

              <div className='absolute hidden group-hover:block top-0 right-0 z-10 pt-12'>
                <ul className='bg-white shadow-lg rounded py-3 px-5 w-32'>
                  <li
                    onClick={logout}
                    className='cursor-pointer text-center rounded px-3 py-2 hover:text-black'
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex gap-4 items-center'>
            <p
              onClick={() => navigate('/buy-credit')}
              className='cursor-pointer'
            >
              Pricing
            </p>

            <button
              onClick={() => setShowLogin(true)}
              className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
