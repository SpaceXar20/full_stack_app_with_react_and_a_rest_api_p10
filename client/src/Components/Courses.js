//this component will have it's own state
import React, { Component } from 'react';
import axios from "axios";
import '../styles/global.css';

/*This component provides the "Courses" screen by retrieving the list of courses 
from the REST API's /api/courses route and rendering a list of courses. 
Each course needs to link to its respective "Course Detail" screen. 
This component also renders a link to the "Create Course" screen. */

 class Courses extends Component {
  constructor(props) {
    //state for data we want to display from API
    super(props);
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
   //map over the courses array to return descriptions of my courses
   render() {
     const{courses} = this.state;
     return ( //JSX inside
      <div className="bounds"> 
      <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
          <h4 className="course--label">Course</h4>
          {courses.map(course => <h3 className="course-title">{course.title}</h3>)}
        </a></div>
      <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
        </a></div>
    </div> 
       
     )
   } 
   }
     
   
   
   
   
   export default Courses;
   