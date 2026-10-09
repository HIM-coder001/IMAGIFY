import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex justify-between items-center gap-4 py-3 mt-20 border-t border-gray-100'>
      <img src={assets.logo} alt='Imagify' width={150} />
      <p className='flex-1 border-l border-gray-300 pl-4 text-sm text-gray-500 max-sm:hidden'>
        Copyright &copy; Joseph.dev | All rights reserved
      </p>
      <div className='flex gap-2.5'>
        <a href='https://facebook.com' target='_blank' rel='noreferrer' aria-label='Facebook'>
          <img src={assets.facebook_icon} alt='Facebook' width={35} className='hover:opacity-75 transition-opacity' />
        </a>
        <a href='https://twitter.com' target='_blank' rel='noreferrer' aria-label='Twitter'>
          <img src={assets.twitter_icon} alt='Twitter' width={35} className='hover:opacity-75 transition-opacity' />
        </a>
        <a href='https://instagram.com' target='_blank' rel='noreferrer' aria-label='Instagram'>
          <img src={assets.instagram_icon} alt='Instagram' width={35} className='hover:opacity-75 transition-opacity' />
        </a>
      </div>
    </div>
  )
}

export default Footer
