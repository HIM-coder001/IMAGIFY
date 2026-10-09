import React, { useContext, useState } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const BuyCredit = () => {

  const { user, backendUrl, token, loadCreditsData, setShowLogin } = useContext(AppContext)
  const [phone, setPhone] = useState('')
  const [loadingPlan, setLoadingPlan] = useState(null)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const handlePlanClick = (plan) => {
    if (!user) {
      setShowLogin(true)
      return
    }
    setSelectedPlan(plan)
    setShowPhoneModal(true)
  }

  const handlePayment = async (e) => {
    e.preventDefault()

    if (!phone || phone.length < 9) {
      toast.error('Please enter a valid phone number')
      return
    }

    const formattedPhone = phone.startsWith('0')
      ? '254' + phone.slice(1)
      : phone.startsWith('+')
      ? phone.slice(1)
      : phone

    setLoadingPlan(selectedPlan.id)
    try {
      const { data } = await axios.post(
        backendUrl + '/api/mpesa/stkpush',
        {
          amount: selectedPlan.price,
          phone: formattedPhone,
          userId: user.id
        },
        { headers: { token } }
      )

      if (data.success) {
        toast.success('STK push sent. Check your phone to complete payment.')
        setShowPhoneModal(false)
        setPhone('')
        setTimeout(() => {
          loadCreditsData()
        }, 15000)
      } else {
        toast.error(data.message || 'Payment initiation failed')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='min-h-[80vh] text-center pt-14 mb-10'
    >
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose a plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div
            key={index}
            className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'
          >
            <img src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>KSH {item.price}</span>
              /{item.credits} credits
            </p>
            <button
              onClick={() => handlePlanClick(item)}
              disabled={loadingPlan === item.id}
              className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer disabled:opacity-60'
            >
              {loadingPlan === item.id ? 'Processing...' : user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>

      {showPhoneModal && (
        <div className='fixed inset-0 z-20 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
          <form
            onSubmit={handlePayment}
            className='bg-white p-8 rounded-xl shadow-lg w-80 text-left relative'
          >
            <h2 className='text-lg font-semibold mb-1 text-neutral-700'>
              {selectedPlan?.id} Plan
            </h2>
            <p className='text-sm text-gray-500 mb-4'>
              KSH {selectedPlan?.price} for {selectedPlan?.credits} credits
            </p>
            <label className='text-sm text-gray-600 block mb-1'>M-Pesa Phone Number</label>
            <input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='e.g. 0712345678'
              required
              className='border rounded-full px-4 py-2 w-full text-sm outline-none mb-4'
            />
            <button
              type='submit'
              disabled={loadingPlan !== null}
              className='w-full bg-gray-800 text-white py-2.5 rounded-full text-sm cursor-pointer disabled:opacity-60'
            >
              {loadingPlan ? 'Sending...' : 'Pay Now'}
            </button>
            <button
              type='button'
              onClick={() => { setShowPhoneModal(false); setPhone('') }}
              className='absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-light cursor-pointer'
            >
              x
            </button>
          </form>
        </div>
      )}
    </motion.div>
  )
}

export default BuyCredit
