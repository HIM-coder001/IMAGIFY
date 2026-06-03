import React, { useContext } from 'react';
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

     const {user, setShowLogin ,logout, credit} = useContext(AppContext)
    
    const navigate = useNavigate()

  return (
    <div className='flex justify-between items-center py-4'>
      <Link to='/'>
        <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40'/>
      </Link> 

      <div>
        {user ? 
        <div className='flex items-center gap-3'>
           <button onClick={()=>navigate("/buy")} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-2 rounded-full hover:scale-105 transition-all duration-300'>
               <img className='w-5' src={assets.credit_star} alt="" />
               <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits: {credit ?? 0}</p>
           </button>
           <p className='text-gray-600 hidden sm:block'>Hi, {user.name}</p>
           <button onClick={logout} className='bg-zinc-800 text-white px-6 py-2 text-sm rounded-full cursor-pointer hover:bg-zinc-900 transition-colors duration-300'>Logout</button>
        </div> 
        : 
        <div className='flex gap-2 items-center sm:gap-5 '>
            <p onClick={()=>navigate('/buy')} className='cursor-pointer'>Pricing</p>
            <button onClick={()=>setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer'>Login</button>
        </div>
        }
         
      </div>
    </div>
  )
}

export default Navbar
