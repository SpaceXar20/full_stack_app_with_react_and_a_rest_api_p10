// src/App.js file will serve as main container component

import React, { Component } from 'react';
import './styles/global.css';
import axios from "axios";

class App extends Component { //Class components need to extend  React.Component, and class components require the render()
  constructor() {
    //state for data we want to display from flickr
    super();
    this.state = {
      courses: []
    };
  }

componentDidMount() {
 //fetch data from API
 axios
 .get('http://localhost:5000/api/courses')
 .then(results => {
   console.log(results)
   this.setState({
    courses: results.data
 })
 
 })
}

render() {
  return (
    <ul>
      {this.state.courses.data}
    </ul>
  )
}
}
  




export default App;
