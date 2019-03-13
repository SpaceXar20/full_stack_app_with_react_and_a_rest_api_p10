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
      password: '' 
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

signIn(emailAddress, password) {
  
  axios({
    method: 'get',
    url: 'http://localhost:5000/api/users/',
    headers: {'header1':emailAddress, 'header2': password},
    }).then(results => {
      //results param came back as data from api
      this.setState({
        //set the authenticated user info into state
        emailAddress: results.data,
        password: results.data.user
      });
    }).then( () => {
      const {  history } = this.props;
      history.push(`/`)
    })
};

//pass signIn as props to UserSignIn component
  render() {
    return (
      //JSX inside
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route exact path="/courses/create" component={CreateCourse} />
            <Route exact path="/courses/:id/update" component={UpdateCourse} />
            <Route exact path="/courses/:id" component={CourseDetail} />
            <Route exact path="/signin" component={ () => <UserSignIn signin={this.signIn}/>} />
            <Route exact path="/signup" component={UserSignUp} />
            <Route exact path="/signout" component={UserSignOut} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
