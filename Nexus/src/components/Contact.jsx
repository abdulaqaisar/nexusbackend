import React from 'react'
import '../Styles/Contact.css'
import msg_icon from '../assets/msg-icon.png'
import mail_icon from '../assets/mail-icon.png'
import phone_icon from '../assets/phone-icon.png'
import location_icon from '../assets/location-icon.png'
import white_arrow from '../assets/white arrow.png'
import Title from './Title'

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "a28a271e-05f5-4fb9-a25b-740cdea1816e");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div id='contact'>
    <Title subTitle= 'CONTACT US' title='GET IN TOUCH'/>
    <div className='Contact'>

      <div className="contact-col">
        <h3>Send message <img src={msg_icon} /></h3>

        <form onSubmit={onSubmit}>
          <label>YOUR NAME</label>
          <input type='text' name='name' placeholder='ENTER YOUR NAME' 
          required/>
          <label>PHONE NUMBER</label>
          <input type='tel' name='phone' placeholder='ENTER YOUR NUMBER' 
          required/>
          <label>YOUR MESSAGE</label>
          <textarea name='message' rows="6" placeholder='ENTER YOUR MESSAGE'
          required></textarea>
          <button type='submit' className='btn dark-btn'>SUBMIT NOW
            <img src={white_arrow}/></button>
        </form>
        <span>{result}</span>
        </div>

        <div className="contact-col">
        <p>Feel free to reach us, we will try to reply at first</p>
      <ul>
        <li><img src={mail_icon}/> Contact@nexus</li>
        <li><img src={phone_icon}/> +42 1234567</li>
        <li><img src={location_icon}/> Lahore,Pakistan</li>
      </ul>
      </div>
    </div>
          </div>
  )
}

export default Contact