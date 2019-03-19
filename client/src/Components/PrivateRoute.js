import React from "react";
import {
    Route,
    Redirect,
  } from "react-router-dom";

// Configure your protected routes
//  Define a higher-order component (HOC) named PrivateRoute for
//   configuring protected routes (i.e. routes that require authentication).

//  Use a stateless functional component to wrap an instance of the <Route> component. I used a code snippet from https://reacttraining.com/react-router/web/example/auth-workflow
function PrivateRoute({ component: Component, ...rest }) {
    return ( 
      <Route
        {...rest}
        render={props =>
        //If "IsLoggedIn" is located inside the local storage(user logged in)
            localStorage.getItem("IsLoggedIn")   //then render the components defined by PrivateRoute */
            ? ( <Component {...props} /> ) 
            : (alert('You must be logged in to do that!'),   //else if there's no authenticated user, redirect the user to the signin route 
            <Redirect 
              to='/signin' 
            /> 
          ) 
        }
      />
    );
  }
//  Use the <Route> component's render property to define a function that 
//  renders the component associated with the private route 
//  if there's an authenticated user or redirects the user to the /signin route if there's not an authenticated user.
 
//  Update the following routes to use the PrivateRoute component:
//  /courses/create
//  /courses/:id/update 
 
export default PrivateRoute;