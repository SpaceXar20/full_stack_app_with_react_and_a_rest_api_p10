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


class App extends Component {
  //Class components need to extend  React.Component, and class components require the render()
  constructor() {
    //state for data we want to display from api
    super();
    this.state = {
      //set initial state to a empty array called courses
      courses: []
    };
  }

  componentDidMount() {
    //fetch data from API
    axios.get("http://localhost:5000/api/courses").then(results => {
      //  console.log(results), this lets me know that I was able to grab my api data
      this.setState({
        courses: results.data
      });
    });
  }

  render() {
    return (
      //JSX inside
      <BrowserRouter>
        <div>
          <Header title="thisIsAProp" />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route exact path="/courses/create" component={CreateCourse} />
            <Route exact path="/courses/:id/update" component={UpdateCourse} />
            <Route exact path="/courses/:id" component={CourseDetail} />
            <Route exact path="/signin" component={UserSignIn} />
            <Route exact path="/signup" component={UserSignUp} />
            <Route exact path="/signout" component={UserSignOut} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
