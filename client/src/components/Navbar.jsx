import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const { user, setShowLogin, logout, credit } = useContext(AppContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleNav = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <div className='flex justify-between items-center py-4 relative'>
      <Link to='/'>
        <img src={assets.logo} alt='Imagify' className='w-28 sm:w-32 lg:w-40' />
      </Link>

      <div className='flex items-center gap-3'>
        {user ? (
          <>
            <div className='hidden sm:flex items-center gap-3'>
              <button
                onClick={() => navigate('/gallery')}
                className='text-sm text-gray-600 cursor-pointer hover:text-black transition-colors'
              >
                Gallery
              </button>
              <button
                onClick={() => navigate('/buy')}
                className='flex items-center gap-2 bg-zinc-100 px-4 sm:px-6 py-2 rounded-full hover:scale-105 transition-all duration-300'
              >
                <img className='w-5' src={assets.credit_star} alt='' />
                <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits: {credit ?? 0}</p>
              </button>
              <p className='text-gray-600 text-sm'>Hi, {user.name}</p>
              <button
                onClick={logout}
                className='bg-zinc-800 text-white px-6 py-2 text-sm rounded-full cursor-pointer hover:bg-zinc-900 transition-colors'
              >
                Logout
              </button>
            </div>

            <button
              className='sm:hidden flex items-center gap-2 bg-zinc-100 px-4 py-2 rounded-full'
              onClick={() => navigate('/buy')}
            >
              <img className='w-4' src={assets.credit_star} alt='' />
              <span className='text-xs font-medium text-gray-600'>{credit ?? 0}</span>
            </button>

            <button
              onClick={() => setMenuOpen(v => !v)}
              className='sm:hidden flex flex-col gap-1 p-2 cursor-pointer'
              aria-label='Menu'
            >
              <span className='block w-5 h-0.5 bg-gray-700' />
              <span className='block w-5 h-0.5 bg-gray-700' />
              <span className='block w-5 h-0.5 bg-gray-700' />
            </button>

            {menuOpen && (
              <div className='absolute top-full right-0 mt-1 bg-white border rounded-xl shadow-lg z-20 py-2 w-44 flex flex-col sm:hidden'>
                <button onClick={() => handleNav('/gallery')} className='text-sm text-gray-700 px-5 py-2.5 text-left hover:bg-gray-50'>Gallery</button>
                <button onClick={() => handleNav('/result')} className='text-sm text-gray-700 px-5 py-2.5 text-left hover:bg-gray-50'>Generate</button>
                <button onClick={() => handleNav('/buy')} className='text-sm text-gray-700 px-5 py-2.5 text-left hover:bg-gray-50'>Buy Credits</button>
                <hr className='my-1' />
                <button onClick={() => { logout(); setMenuOpen(false) }} className='text-sm text-red-500 px-5 py-2.5 text-left hover:bg-gray-50'>Logout</button>
              </div>
            )}
          </>
        ) : (
          <div className='flex gap-2 items-center sm:gap-5'>
            <p onClick={() => navigate('/buy')} className='cursor-pointer text-sm text-gray-600 hover:text-black transition-colors'>Pricing</p>
            <button
              onClick={() => setShowLogin(true)}
              className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer hover:bg-zinc-900 transition-colors'
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
