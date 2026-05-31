import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenarateBtn from '../components/GenarateBtn'

const Home = () => {
  return (
    <div>
       <Header />
       <Steps />
       <Description />
       <Testimonials />
       <GenarateBtn />
    </div>
  )
}

export default Home
