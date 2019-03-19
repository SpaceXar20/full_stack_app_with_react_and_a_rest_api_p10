import React from 'react';
import { NavLink } from 'react-router-dom'; //import NavLink to create nav links and to put active class on any link that is active

//this component will render if there is no authenticated user
const GuestGreeting = () => {
  return ( //JSX inside
    <div className="header"> 
    <div className="bounds">
    <NavLink to='/' className="header--logo">Courses</NavLink>
    <nav><NavLink to='/signup' className="signin" href="sign-up.html">Sign Up</NavLink><NavLink to='/signin' className="signin" href="sign-in.html">Sign In</NavLink></nav>
  </div>
</div>
  )
}

export default GuestGreeting;