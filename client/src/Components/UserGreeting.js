// stateless functional component

import React from 'react';
import { NavLink } from 'react-router-dom'; //import Navlink to create nav links and to put active className on any link that is active

//This component will render if there is an authenticated user


const UserGreeting = () => {

  return ( //JSX inside
    <div className="header"> 
        <div className="bounds">
        <NavLink to='/' className="header--logo">Courses</NavLink>
          <nav><span>{`welcome  ${localStorage.getItem('FirstName')}  ${localStorage.getItem('LastName')}`}!</span><a className="signout" href="index.html">Sign Out</a></nav>
        </div>
      </div> 
  )
}

export default UserGreeting;