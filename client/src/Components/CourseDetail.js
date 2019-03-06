//this component will have it's own state
import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom"; //import Navlink to create nav links and to put active class on any link that is active

/* This component provides the "Course Detail" screen by retrieving the detail 
for a course from the REST API's /api/courses/:id route and rendering the course.

The component also renders a "Delete Course" button that when clicked 
should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course.

This component also renders an "Update Course" button for navigating to the "Update Course" screen. */

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {course: [] };
  }

  componentDidMount() { //I used a code snippet from this video https://scotch.io/courses/using-react-router-4/route-params 
    const { match: { params } } =this.props
    //fetch data from API
    axios.get(`http://localhost:5000/api/courses/${params.id}`)
    .then(({data: course}) => {
      this.setState({course})
    });
  }

  render() {
    const { course } = this.state;
    return (
      //JSX inside
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <NavLink to="/courses/:id/update" className="button">
                  Update Course
                </NavLink>
                <a className="button" href="#">
                  Delete Course
                </a>
              </span>
              <NavLink
                to="/"
                className="button button-secondary"
                href="index.html"
              >
                Return to List
              </NavLink>
            </div>
          </div>
        </div>
        {/* need to map after bounds */}
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>This course was created by:  {course.user}</p>
            </div>
            <div className="course--description">
              <p>
                {course.description}
              </p>
              
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>{course.materialsNeeded}</li>

                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetail;
