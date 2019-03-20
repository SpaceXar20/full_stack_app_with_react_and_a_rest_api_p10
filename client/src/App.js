// src/App.js file will serve as main container component, the parent component

//import React dependencies//import BrowserRouter and Route
import React, { Component } from "react";
import "./styles/global.css";
import axios from "axios";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";


//import Components
import Header from "./Components/Header";
import Courses from "./Components/Courses";
import CourseDetail from "./Components/CourseDetail";
import UserSignIn from "./Components/UserSignIn";
import UserSignUp from "./Components/UserSignUp";
import CreateCourse from "./Components/CreateCourse";
import UpdateCourse from "./Components/UpdateCourse";
import UserSignOut from "./Components/UserSignOut"
import PrivateRoute from "./Components/PrivateRoute"

/*I am going to manage user authentication on this component by using local storage, that way
 the authenticated user and the user sign in and sign out actions (i.e. methods) will be made 
 available throughout the application*/

class App extends Component {
  //Class components need to extend  React.Component, and class components require the render()
  constructor() { //since I'll be using local storage to authenticate users, I won't be using  props on this component
    super();
    this.state = {
      
    };
    this.signIn = this.signIn.bind(this); //bind the signIn method in order to associate it with the class so we can use it on the  context of [this]
  }


  /*Create your signIn() method.
Your signIn() method should define emailAddress and password parameters.

To authenticate the user, make a request to the REST API's /users endpoint,
 using the emailAddress and password parameter values to set an Authorization header on 
 the request using the Basic Authentication scheme.

If the request to the REST API succeeds (i.e. the server returns an "200 OK" HTTP status code),
 then you'll know that the supplied user credentials are valid. If the server returns a
  "401 Unauthorized" HTTP status code, then the supplied user credentials are invalid.

After validating the user's credentials, persist the returned user record 
and the user's password in the global state. Doing this will allow you to create 
and set the appropriate Authorization header on future REST API requests that require authentication.*/

signIn(userData) {
  console.log(userData)
  //do a fetch call to get/users
  axios.get('http://localhost:5000/api/users', {
   auth: { //set auth headers so that userData will hold the email address and password for the authenticated user 
       username: userData.emailAddress,
       password: userData.password
       
}
}).then(results => { console.log(results.data)
      
      //use local Storage so that the user's credentials info will be able to be accessible even when the user reloads the page
      
      window.localStorage.setItem('FirstName',results.data.firstName)
      window.localStorage.setItem('LastName', results.data.lastName)
      window.localStorage.setItem('Email',userData.emailAddress)
      window.localStorage.setItem('Password',userData.password)
      window.localStorage.setItem('UserId', JSON.stringify(results.data.user_id))
      window.localStorage.setItem('IsLoggedIn', JSON.stringify(true))
      window.location.assign('/') //use location.assign so that the user can be redirected to the updated Nav bar with their name after login in
})

}

  render() {
    return (
      //JSX inside
      <BrowserRouter>
        <div>
          <Header  />
          <Switch>
            <Route exact path="/" component={Courses} />
            <PrivateRoute path="/courses/create"  component={CreateCourse} /> {/*this route will need to be protected */}
            <PrivateRoute path="/courses/:id/update" component={UpdateCourse} /> {/*this route will need to be protected */}
            <Route exact path="/courses/:id" component={CourseDetail} />
            <Route exact path="/signin" component={() => <UserSignIn  signIn={this.signIn}/>} /> 
            <Route exact path="/signup" component={UserSignUp} />
            <Route exact path="/signout" component={() => <UserSignOut signOut={this.signOut}/>} /> 
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
