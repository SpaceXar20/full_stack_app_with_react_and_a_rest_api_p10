import React, { Component } from "react";
import { NavLink } from 'react-router-dom'; //import Navlink to create nav links and to put active className on any link that is active

/*This component will render if there is an authenticated user,
 for the sign out button, I will need to delete local store by using localStorage.clear();
 and use NavLink to redirect the user to main page afterwards   */

class UserGreeting extends Component {
  constructor() {
    super()
  }

  handleSignOut = () => {
    localStorage.clear();
   }

  render() {
    return ( //JSX inside
      <div className="header"> 
          <div className="bounds">
          <NavLink to='/' className="header--logo">Courses</NavLink>
            <nav><span>{`welcome back ${localStorage.getItem('FirstName')}  ${localStorage.getItem('LastName')}`}!</span><NavLink to='/' onClick={this.handleSignOut} className="signout">Sign Out</NavLink></nav>
          </div>
        </div> 
    ) 
  }
  
}

export default UserGreeting;