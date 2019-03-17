// src/App.js file will serve as main container component, the parent component

import React, { Component } from "react";
import "./styles/global.css";
import axios from "axios";
import {
  //import BrowserRouter and Route
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";


//import Components
import Header from "./Components/Header";
import Courses from "./Components/Courses";
import CourseDetail from "./Components/CourseDetail";
import UserSignIn from "./Components/UserSignIn";
import UserSignUp from "./Components/UserSignUp";
import CreateCourse from "./Components/CreateCourse";
import UpdateCourse from "./Components/UpdateCourse";
import UserSignOut from "./Components/UserSignOut";

/*I am going to manage user authentication on this component
 the authenticated user and the user sign in and sign out actions (i.e. methods) will be made 
 available throughout the application, by using props to pass references down through the component tree. */

class App extends Component {
  //Class components need to extend  React.Component, and class components require the render()
  constructor() {
    super();
    this.state = {
      emailAddress: '',
      password: '',
      IsLoggedIn: false 
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
       username: userData. emailAddress,
       password: userData.password
       
}
}).then(results => { console.log(results.data)
      this.setState({
        //set the authenticated user info into state
        emailAddress: userData.emailAddress,
        password: userData.password,
        IsLoggedIn: true
      });
      //use local Storage so that the user's credentials info will be able to be accessible even when the user reloads the page
      
      window.localStorage.setItem('FirstName',results.data.firstName)
      window.localStorage.setItem('LastName', results.data.lastName)
      window.localStorage.setItem('Email',userData.emailAddress)
      window.localStorage.setItem('Password',userData.password)
      // // localStorage.setItem('UserId', JSON.stringify(results.data.user_id))
       window.localStorage.setItem('IsLoggedIn', JSON.stringify(true))
      alert(`welcome  ${localStorage.getItem('FirstName')}`)
})

}
//pass the auth header as props to all child components that will need authentication
  render() {
    return (
      //JSX inside
      <BrowserRouter>
        <div>
          <Header IsLoggedIn={this.state.IsLoggedIn} />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route exact path="/courses/create"  component={props => <CreateCourse {...props}  IsLoggedIn={this.state.IsLoggedIn} />} />
            <Route exact path="/courses/:id/update" component={props => <UpdateCourse  {...props}  IsLoggedIn={this.state.IsLoggedIn} />} />
            <Route exact path="/courses/:id" component={props => <CourseDetail {...props} IsLoggedIn={this.state.IsLoggedIn} />} />
            <Route exact path="/signin" component={props => <UserSignIn {...props} signIn={this.signIn}/>} /> 
            <Route exact path="/signup" component={UserSignUp} />
            {/* <Route exact path="/signout" component={UserSignOut} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
