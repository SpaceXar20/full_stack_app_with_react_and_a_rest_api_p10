//this component will have it's own state
import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from 'react-router-dom'; //import Navlink to create nav links and to put active class on any link that is active

/*This component provides the "Courses" screen by retrieving the list of courses 
from the REST API's /api/courses route and rendering a list of courses.

Each course needs to link to its respective "Course Detail" screen.
 
This component also renders a link to the "Create Course" screen. */

 class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [] //set initial state to a empty array called courses
    };
  }   

  componentDidMount() {
    //fetch data from API
    axios
    .get('http://localhost:5000/api/courses')
    .then(results => { //results param came back as data from api
      this.setState({ //set state by setting the courses array to hold the data that came from results
       courses: results.data
    })
     //console.log(results) //by console logging I was able to seee that the array of all courses showed up
    })
   }
   
   render() {
     const{courses} = this.state;  //set this.state inside a const var called courses
     return ( //JSX inside
      <div className="bounds"> {/*map over the courses array to return titles of my courses, I used a code snippet from here https://stackoverflow.com/a/52428922/10043628 */}
      {courses.map(course => <div key={course._id} className="grid-33"><NavLink to={`/courses/${course._id}`} className="course--module course--link" > {/*when the user clicks on a course link, the user will be d=redirected to that course info based on their _id */}
       <h4 className="course--label">Course</h4>  
       <h3 className="course--title">{course.title}</h3> <br />
       </NavLink> </div>)} 
       
      <div className="grid-33"><NavLink to='/courses/create' className="course--module course--add--module" >
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
        </NavLink></div>
    </div> 
       
     )
    } 
   }
   
   
   export default Courses;
   