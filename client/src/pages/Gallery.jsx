import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Gallery = () => {
    const { token, backendUrl, user, setShowLogin } = useContext(AppContext)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            setShowLogin(true)
            return
        }
        fetchGallery()
    }, [token])

    const fetchGallery = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/image/gallery', {
                headers: { token }
            })
            if (data.success) {
                setImages(data.images)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    if (!token) return null

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='min-h-[80vh] pt-14 mb-10'
        >
            <div className='text-center mb-10'>
                <h1 className='text-3xl font-semibold mb-2'>My Gallery</h1>
                <p className='text-gray-500'>All images you have generated</p>
            </div>

            {loading && (
                <div className='flex justify-center items-center h-40'>
                    <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
                </div>
            )}

            {!loading && images.length === 0 && (
                <div className='flex flex-col items-center justify-center h-60 gap-4 text-gray-500'>
                    <p>No images yet. Go generate something.</p>
                    <button
                        onClick={() => navigate('/result')}
                        className='bg-zinc-800 text-white px-8 py-2.5 rounded-full text-sm cursor-pointer'
                    >
                        Generate Image
                    </button>
                </div>
            )}

            {!loading && images.length > 0 && (
                <div className='columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4'>
                    {images.map((img) => (
                        <div
                            key={img._id}
                            className='break-inside-avoid group relative rounded-lg overflow-hidden shadow-md border'
                        >
                            <img
                                src={img.imageUrl}
                                alt={img.prompt}
                                className='w-full object-cover transition-transform duration-300 group-hover:scale-105'
                            />
                            <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3'>
                                <p className='text-white text-xs line-clamp-3'>{img.prompt}</p>
                                <div className='flex items-center justify-between mt-2'>
                                    <p className='text-gray-300 text-xs'>
                                        {new Date(img.createdAt).toLocaleDateString()}
                                    </p>
                                    <a
                                        href={img.imageUrl}
                                        download={`imagify-${img._id}.png`}
                                        className='bg-white text-black text-xs px-3 py-1 rounded-full cursor-pointer'
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    )
}

export default Gallery
