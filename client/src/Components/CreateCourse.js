//this component will have it's own state
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; //import Navlink to create nav links and to put active class on any link that is active

/*This component provides the "Create Course" screen by rendering a form 
that allows a user to create a new course. 

The component also renders a "Create Course" button that when clicked sends 
a POST request to the REST API's /api/courses route. 

This component also renders a "Cancel" button that returns the user to 
the default route (i.e. the list of courses).*/

class CreateCourse extends Component {
    constructor(props) {
      //state for data we want to display from API
      super(props);
      // console.log(this.props)
      this.state = {
        newCourse: '' //set initial state to a empty string called newCourse
      };
    }   
  
    componentDidMount() {
      
     }
     
     render() {
       const{newCourse} = this.state;  //set newCourse array with data to this.state 
       return ( //JSX inside
        <div>
        <hr />
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  <li>Please provide a value for "Title"</li>
                  <li>Please provide a value for "Description"</li>
                </ul>
              </div>
            </div>
            <form>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={""} /></div>
                  <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                  <div><textarea id="description" name="description" className placeholder="Course description..." defaultValue={""} /></div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={""} /></div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." defaultValue={""} /></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><NavLink to='/' className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</NavLink></div>
            </form>
          </div>
        </div>
      </div> 
     );
    } 
   }
     
     
     export default CreateCourse;
     