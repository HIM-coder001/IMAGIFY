import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Gallery from './pages/Gallery'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const {showLogin} = useContext(AppContext)

  return (
    <div className='min-h-screen bg-linear-to-b from-teal-50 to-orange-50'>
      <ToastContainer position='top-center' autoClose={3000} />
      <div className='sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-10 md:px-14 lg:px-28'>
        <Navbar />
      </div>
      {showLogin && <Login />}
      <div className='px-4 sm:px-10 md:px-14 lg:px-28'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />
        <Route path='/gallery' element={<Gallery />} />
      </Routes>
      <Footer />
      </div>
    </div>
  )
}

export default App
