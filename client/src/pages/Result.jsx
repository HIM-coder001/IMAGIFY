import React, { useState, useContext, useRef, useEffect } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const MAX_CHARS = 500

const Result = () => {

  const [image, setImage] = useState(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const { generateImage, token, credit } = useContext(AppContext)
  const navigate = useNavigate()
  const textareaRef = useRef(null)

  const autoResize = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }

  useEffect(() => {
    autoResize()
  }, [input])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!input.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    if (!token || credit <= 0) {
      toast.info('Please login or buy credits to generate images')
      navigate('/buy')
      return
    }

    setLoading(true)
    const result = await generateImage(input)
    if (result) {
      setIsImageLoaded(true)
      setImage(result)
    }
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col min-h-[90vh] justify-center items-center'
    >
      <div className='w-full max-w-sm'>
        {image ? (
          <div className='relative rounded-lg overflow-hidden shadow-lg'>
            <img src={image} alt='Generated' className='w-full rounded-lg' />
            {loading && (
              <div className='absolute inset-0 bg-white/70 flex flex-col items-center justify-center gap-3 rounded-lg'>
                <div className='w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
                <p className='text-sm text-gray-600'>Generating your image...</p>
              </div>
            )}
          </div>
        ) : (
          <div className={`w-full aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-colors duration-300 ${loading ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white/50'}`}>
            {loading ? (
              <>
                <div className='w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
                <p className='text-sm text-gray-500'>Generating your image...</p>
              </>
            ) : (
              <>
                <img src={assets.star_group} alt='' className='w-10 opacity-30' />
                <p className='text-sm text-gray-400'>Your image will appear here</p>
              </>
            )}
          </div>
        )}
      </div>

      <form onSubmit={onSubmitHandler} className='w-full max-w-xl mt-10'>
        <div className='flex items-end bg-neutral-500 text-white text-sm p-2 rounded-2xl gap-2'>
          <textarea
            ref={textareaRef}
            onChange={e => { setInput(e.target.value); autoResize() }}
            value={input}
            maxLength={MAX_CHARS}
            rows={2}
            placeholder='Describe what you want to generate...'
            className='flex-1 bg-transparent outline-none ml-4 resize-none placeholder-color leading-relaxed py-1 max-sm:w-20'
            style={{ minHeight: '3rem', maxHeight: '12rem' }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                onSubmitHandler(e)
              }
            }}
          />
          <button
            type='submit'
            disabled={loading}
            className='bg-zinc-900 px-8 sm:px-12 py-2.5 rounded-xl text-white cursor-pointer disabled:opacity-60 transition-opacity flex-shrink-0 self-end'
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className='flex justify-between mt-1.5 px-1'>
          <p className='text-xs text-gray-400'>Shift + Enter for new line</p>
          <p className={`text-xs ${input.length > MAX_CHARS * 0.9 ? 'text-red-400' : 'text-gray-400'}`}>
            {input.length}/{MAX_CHARS}
          </p>
        </div>
      </form>

      {isImageLoaded && (
        <div className='flex gap-3 flex-wrap justify-center mt-6'>
          <button
            onClick={() => { setIsImageLoaded(false); setImage(null) }}
            className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer text-sm hover:bg-zinc-50 transition-colors'
          >
            Generate Another
          </button>
          <a
            href={image}
            download='imagify-result.png'
            className='bg-zinc-900 text-white px-10 py-3 rounded-full cursor-pointer text-sm hover:bg-zinc-700 transition-colors'
          >
            Download
          </a>
        </div>
      )}
    </motion.div>
  )
}

export default Result
