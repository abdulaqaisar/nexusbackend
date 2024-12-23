import React from 'react'
import '../Styles/Facilities.css'
import cafeteria from '../assets/cafeteria.jpg'
import computer_lab from '../assets/computer lab.jpg'
import library from '../assets/library.jpg'
import Title from './Title'



const Facilities = () => {
  return (
    <>
    <Title subTitle= 'FACILITIES' title='FACILITIES'/>
    <div id='facilities' className='facilities'>


        <div className="facility">
        <div className="facilities-col">
            <img src={cafeteria}/>
            <h3>CAFETERIA</h3>
            </div>
            <div class="facilities-col">
            <img src={computer_lab}/>
            <h3>LAB</h3>
            </div>
            <div class="facilities-col">
            <img src={library}/>
            <h3>LIBRARY</h3>
            </div>
            
        </div>
      
    </div>
    </>
  )
}

export default Facilities