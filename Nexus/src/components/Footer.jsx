import React, { useState } from 'react';
import '../Styles/Footer.css';

const Footer = () => {
    const [showMessage, setShowMessage] = useState(true);

    return (
        <div className='footer'>
            {showMessage && <p>© 2024 Nexus. All rights reserved.</p>}
            <ul>
                <li>Terms of Services</li>
                <li>Privacy Policy</li>
            </ul>
            <button onClick={() => setShowMessage(!showMessage)}>
                {showMessage ? 'Hide Message' : 'Show Message'}
            </button>
        </div>
    );
}

export default Footer;