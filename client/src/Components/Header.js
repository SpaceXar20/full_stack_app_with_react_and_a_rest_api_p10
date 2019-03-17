// stateless functional component

import React from 'react';
import { Router } from 'react-router-dom'; //import Navlink to create nav links and to put active class on any link that is active
import UserGreeting from './UserGreeting'
import GuestGreeting from './GuestGreeting'

/*Header- Displays the top menu bar for the application and 
includes buttons for signing in and signing up 
(if there's not an authenticated user) or the user's first and last name 
and a button for signing out (if there's an authenticated user).*/

function Header() {
  const isLoggedIn = (localStorage.getItem('IsLoggedIn'))
  console.log(isLoggedIn)
  if (isLoggedIn) {
    return <UserGreeting />;
  }
    return <GuestGreeting  />;
    
  
}



// if (localStorage.getItem('user')){
//   // return this header
// } else if(!){
//   // return this
// }
//   const isLoggedIn = props
//   console.log(isLoggedIn)
//   return ( //JSX inside
//     <div className="header"> 
//     <div className="bounds">
//     <NavLink to='/' className="header--logo">Courses</NavLink>
//     <nav><NavLink to='/signup' className="signin" href="sign-up.html">Sign Up</NavLink><NavLink to='/signin' className="signin" href="sign-in.html">Sign In</NavLink></nav>
//   </div>
// </div>
//   )


export default Header;