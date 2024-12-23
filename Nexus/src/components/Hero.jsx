import React, { useState } from 'react';
import '../Styles/Hero.css';
import arrow from '../assets/arrow.png';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [message, setMessage] = useState("Welcome to our platform!");

    return (
        <div id='hero' className='hero container'>
            <div className='hero-text'>
                <h1>BETTER EDUCATION LEADS TOWARDS BETTER WORLD</h1>
                <p>{message}</p>
                <Link to="/application">
                    <button className='btn apply-now-btn'>Apply Now <img src={arrow} alt="Arrow" />
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Hero;