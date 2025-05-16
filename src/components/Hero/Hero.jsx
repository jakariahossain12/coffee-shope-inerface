import React from 'react';
import heroBg from '../../images/more/3hero-bg.png'
import '../../app.css'

const Hero = () => {
    return (
      <div
        className="hero-section bg-center bg-cover bg-no-repeat  bg-amber-300"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>
    );
};

export default Hero;