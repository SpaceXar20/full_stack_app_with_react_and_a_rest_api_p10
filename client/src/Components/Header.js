// stateless functional component

import React from 'react';


/*Header- Displays the top menu bar for the application and 
includes buttons for signing in and signing up 
(if there's not an authenticated user) or the user's first and last name 
and a button for signing out (if there's an authenticated user).*/

const Header = (props) => {
  console.log(props)
  return ( //JSX inside
    <div className="header"> 
    <div className="bounds">
    <h1 className="header--logo">Courses</h1>
    <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="sign-in.html">Sign In</a></nav>
  </div>
</div>
  )
}

export default Header;