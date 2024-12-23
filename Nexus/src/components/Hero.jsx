import React, { useEffect, useState } from 'react';
import '../Styles/Hero.css';
import arrow from '../assets/arrow.png';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [message, setMessage] = useState("Welcome to our platform!");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const role = localStorage.getItem('userData'); 
    
        if (token) {
          setIsLoggedIn(true);
          setUserRole(role); 
        } else {
          setIsLoggedIn(false);
          setUserRole('');
        }
      }, []);
    
      const dashboardLink = isLoggedIn
          ? '/application' 
        : '/login';

    return (
        <div id='hero' className='hero container'>
            <div className='hero-text'>
                <h1>BETTER EDUCATION LEADS TOWARDS BETTER WORLD</h1>
                <p>{message}</p>
                <Link to={dashboardLink}>
                    <button className='btn apply-now-btn'>Apply Now <img src={arrow} alt="Arrow" />
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Hero;