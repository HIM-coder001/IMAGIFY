import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const EyeIcon = ({ open }) => (
  <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    {open ? (
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.95-.01C6.68 7.56 9.17 5 12 5s5.32 2.56 6.95 6.99C17.32 16.44 14.83 19 12 19s-5.32-2.56-6.95-6.99z' />
    ) : (
      <>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-2.83 0-5.32-2.56-6.95-7 .48-1.34 1.13-2.52 1.93-3.48M9.88 9.88A3 3 0 0114.12 14.12M3 3l18 18' />
      </>
    )}
  </svg>
)

const Login = () => {

  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser, setCredit } = useContext(AppContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          if (data.user?.creditBalance !== undefined) setCredit(data.user.creditBalance)
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          setShowLogin(false)
          toast.success('Logged in successfully')
        } else {
          toast.error(data.message)
        }
      } else {
        if (password !== confirmPassword) {
          toast.error('Passwords do not match')
          return
        }
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          if (data.user?.creditBalance !== undefined) setCredit(data.user.creditBalance)
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          setShowLogin(false)
          toast.success('Account created successfully')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong'
      toast.error(message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 50 }}
      transition={{ duration: 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'
    >
      <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-sm mx-4'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm mt-1'>
          {state === 'Login' ? 'Welcome back, please sign in to continue' : 'Create an account to get started'}
        </p>

        {state !== 'Login' && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.profile_icon} alt='' className='h-6' />
            <input
              onChange={e => setName(e.target.value)}
              value={name}
              type='text'
              placeholder='Full name'
              required
              className='outline-none text-sm w-full'
            />
          </div>
        )}

        <div className='border px-5 py-3 flex items-center gap-3 rounded-full mt-4'>
          <img src={assets.email_icon} alt='' className='w-5 h-5' />
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type='email'
            placeholder='Email'
            required
            className='outline-none text-sm w-full'
          />
        </div>

        <div className='border px-5 py-3 flex items-center gap-3 rounded-full mt-4'>
          <img src={assets.lock_icon} alt='' className='w-5 h-5' />
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            required
            className='outline-none text-sm w-full'
          />
          <button
            type='button'
            onClick={() => setShowPassword(v => !v)}
            className='cursor-pointer flex-shrink-0'
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>

        {state !== 'Login' && (
          <div className='border px-5 py-3 flex items-center gap-3 rounded-full mt-4'>
            <img src={assets.lock_icon} alt='' className='w-5 h-5' />
            <input
              onChange={e => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              required
              className='outline-none text-sm w-full'
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(v => !v)}
              className='cursor-pointer flex-shrink-0'
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              <EyeIcon open={showConfirmPassword} />
            </button>
          </div>
        )}

        <button className='bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer mt-6 hover:bg-blue-700 transition-colors'>
          {state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {state === 'Login' ? (
          <p className='mt-5 text-center text-sm'>
            Don't have an account?
            <span className='text-blue-600 cursor-pointer ml-1 hover:underline' onClick={() => setState('Sign Up')}>Sign up</span>
          </p>
        ) : (
          <p className='mt-5 text-center text-sm'>
            Already have an account?
            <span className='text-blue-600 cursor-pointer ml-1 hover:underline' onClick={() => setState('Login')}>Sign in</span>
          </p>
        )}

        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='Close' className='absolute top-5 right-5 cursor-pointer' />
      </form>
    </motion.div>
  )
}

export default Login
