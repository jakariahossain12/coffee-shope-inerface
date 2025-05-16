import React from 'react';
import headerBg from '../../images/more/header-bg.jpg'

const Header = () => {
    return (
      <div
        className="bg-cover bg-center h-[100px] w-full"
        style={{ backgroundImage: `url(${headerBg})` }}
      ></div>
    );
};

export default Header;