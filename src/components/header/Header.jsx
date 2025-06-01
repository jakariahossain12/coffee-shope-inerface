import React, { use } from 'react';
import headerBg from '../../images/more/header-bg.jpg'
import { NavLink } from 'react-router';
import { AuthContext } from '../../Context/Context';

const Header = () => {
  const { user,signOutUser } = use(AuthContext);
  const handleSignOut = () => {
    signOutUser()
  }

    return (
      <div
        className="bg-cover bg-center h-[100px] w-full flex justify-center  items-center"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className="text-white flex items-center gap-4 font-medium">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/sign-in"}>sign in</NavLink>
          <NavLink to={"sign-up"}>sign up</NavLink>
          <NavLink to={"coffee-users"}>Users</NavLink>
          <button onClick={handleSignOut} className='cursor-pointer '>sign out</button>

          {user && <h1>{user?.email}</h1>}
        </div>
      </div>
    );
};

export default Header;