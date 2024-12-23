import React from 'react'
import Footer from '../components/Footer'
import Programs from '../components/Programs'
import About from '../components/About'
import Facilities from '../components/Facilities'
import Contact from '../components/Contact'
import Campus from '../components/Campus'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import '../Styles/Home.css'

const Home = () => {
  return (
    <>
        <Navbar/>
        <Hero />
        <div className="home">
            <Programs />
            <About />
            <Campus />
            <Facilities />
            <Contact />
            <Footer/>
      </div>
    </>
  )
}

export default Home
