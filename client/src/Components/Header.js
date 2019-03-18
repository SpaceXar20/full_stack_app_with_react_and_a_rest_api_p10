// stateless functional component

import React from "react";
import UserGreeting from "./UserGreeting";
import GuestGreeting from "./GuestGreeting";

/*Header- Displays the top menu bar for the application and 
includes buttons for signing in and signing up 
(if there's not an authenticated user) or the user's first and last name 
and a button for signing out (if there's an authenticated user).*/

function Header() {
  //set the isLoggedIn boolean I stored in local storage to isLoggedIn, if isLoggedIn exists in local storage display UserGreeting, if not then display GuestGreeting
  const isLoggedIn = localStorage.getItem("IsLoggedIn");
  console.log(isLoggedIn);
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

export default Header;
