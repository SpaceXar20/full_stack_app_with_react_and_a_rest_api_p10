// stateless functional component

import React from "react";
import { NavLink } from 'react-router-dom';


/*Header- Displays the top menu bar for the application and 
includes buttons for signing in and signing up 
(if there's not an authenticated user) or the user's first and last name 
and a button for signing out (if there's an authenticated user).*/


function Header() {
  //set the isLoggedIn boolean I stored in local storage to isLoggedIn, if isLoggedIn exists in local storage display UserGreeting, if not then display GuestGreeting
  const isLoggedIn = localStorage.getItem("IsLoggedIn");
  if (isLoggedIn) {
    return <div className="header"> 
    <div className="bounds">
    <NavLink to='/' className="header--logo">Courses</NavLink>
      <nav><span>{`welcome back ${localStorage.getItem('FirstName')}  ${localStorage.getItem('LastName')}`}!</span><NavLink to='/signout'  className="signout">Sign Out</NavLink></nav>
    </div>
  </div>
  }

  return <div className="header"> 
  <div className="bounds">
  <NavLink to='/' className="header--logo">Courses</NavLink>
  <nav><NavLink to='/signup' className="signin" href="sign-up.html">Sign Up</NavLink><NavLink to='/signin' className="signin" href="sign-in.html">Sign In</NavLink></nav>
</div>
</div>
}

export default Header;
