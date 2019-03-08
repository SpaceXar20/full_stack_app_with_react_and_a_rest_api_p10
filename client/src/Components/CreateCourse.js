//this component will have it's own state
import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from 'react-router-dom'; //import Navlink to create nav links and to put active class on any link that is active

/*This component provides the "Create Course" screen by rendering a form 
that allows a user to create a new course. 

The component also renders a "Create Course" button that when clicked sends 
a POST request to the REST API's /api/courses route. 

This component also renders a "Cancel" button that returns the user to 
the default route (i.e. the list of courses).*/

class CreateCourse extends Component {
    constructor(props) {
      //the state here will hold the values for the new course created by the user 
      super(props);
      // console.log(this.props)
      this.state = {
        user: 'user._id', 
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: ''
      };

      this.handleSubmit = this.handleSubmit.bind(this); //bind handleSubmit  to the class in order to use it with (this)
     
    }
    
    
    //this method will be used to create a new course by sending a post request to localhost:5000/api/courses/
    /* NEED TO PASS STATE TO AXIOS */
    handleSubmit(e) {
      e.preventDefault()
      axios
    .post('localhost:5000/api/courses/')
    .then(() => {
      alert('The course was successfully created!');
    });
     }
     
     render() {
       const{} = this.state;  //set newCourse array with data to this.state 
       return ( //JSX inside
        <div>
        <hr />
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            {/* <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  <li>Please provide a value for "Title"</li>
                  <li>Please provide a value for "Description"</li>
                </ul>
              </div>
            </div> */}
            <form onSubmit={this.handleSubmit}>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4> {/*add onChange so that we can change state as the user types on all the inputs */}
                  <div><input  
                  value={this.state.title} 
                  onChange={e => this.setState({ title: e.target.value })} 
                  id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."/></div>

                  <p>{this.state.user}</p>
                </div>
                <div className="course--description">
                  <div><textarea 
                  value={this.state.description} 
                  onChange={e => this.setState({ description: e.target.value })} 
                  id="description" name="description"  placeholder="Course description..." /></div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div><input 
                      value={this.state.estimatedTime} 
                      onChange={e => this.setState({ estimatedTime: e.target.value })}  
                      id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" /></div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div><textarea 
                      value={this.state.materialsNeeded} 
                      onChange={e => this.setState({ materialsNeeded: e.target.value })} 
                      id="materialsNeeded" name="materialsNeeded"  placeholder="List materials..."/></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom"><button className="button"  type="submit">Create Course</button><NavLink to='/' className="button button-secondary">Cancel</NavLink></div>
            </form>
          </div>
        </div>
      </div> 
     );
    } 
   }
     
     
     export default CreateCourse;
     