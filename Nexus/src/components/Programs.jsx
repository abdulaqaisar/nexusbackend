import React from 'react'
import '../Styles/Programs.css'
import program_1 from '../assets/Program 1.png'
import program_2 from '../assets/Program 2.png'
import program_3 from '../assets/Program 3.png'
import program_icon_1 from '../assets/Program icon 1.png'
import program_icon_2 from '../assets/Program icon 2.png'
import program_icon_3 from '../assets/Program icon 3.png'
import Title from './Title'


const Programs = () => {
  return (
    <>
    <Title subTitle= 'OUR PROGRAM' title='What we offer'/>
    <div id='program' className='programs'>

        <div className="program">
        <img src={program_1} />
        <div className='caption'> 
          <img src={program_icon_1} alt=''/>
          <p>Graduation Degree</p>
        </div>
        </div>

        <div className="program">
        <img src={program_2} />
        <div className='caption'> 
          <img src={program_icon_2} alt=''/>
          <p>Master Degree</p>
        </div>
        </div>

        <div className="program">
        <img src={program_3} />
        <div className='caption'> 
          <img src={program_icon_3} alt=''/>
          <p>Post Graduation</p>
        </div>
        </div>

    </div>
    </>
  )
}

export default Programs