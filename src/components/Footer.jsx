import React from 'react'
import './styles/footer.css';
import logo from '../images/farmkal.png';
import playstore from '../images/playstore.png';

const Footer = () => {
  return (
    <div className='f-cont'>
        <div>
            <img className='f-logo' src = {logo} />
        </div>

        <div>

        </div>

        <div className='app'>
            Download our app <br/><br/>
            <img className='f-play' src={playstore} />
        </div>

    </div>
  )
}

export default Footer