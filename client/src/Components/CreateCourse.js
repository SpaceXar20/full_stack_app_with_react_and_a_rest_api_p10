//this component will have it's own state
import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom"; //import Navlink to create nav links and to put active class on any link that is active

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
    this.state = {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this); //bind handleSubmit  to the class in order to use it with (this)
  }

  //this method will be used to create a new course by sending a post request to localhost:5000/api/courses/
  handleSubmit = event => {
    event.preventDefault();
    const newCourse = {
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded
    };
    axios({
      method: "post",
      url: "http://localhost:5000/api/courses",
      auth: {
        username: window.localStorage.getItem("Email"),
        password: window.localStorage.getItem("Password")
      },
      data: newCourse
    })
      .then(response => { //if the response came back as 201("Created"), then alert the user that the course was successfully created, if another code came back then redirect them to the error handler
        if (response.status === 201) {
          alert("The course has been successfully created!");
          this.props.history.push("/");
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        //use a catch method to catch the errors and display them is the status code comes back as 400
        console.log("CATCH =", err.response.data.errors);
        this.setState({
          //if there were errors, then set the errors state in react to the error messages that came from the REST API
          errors: err.response.data.errors
        });
      });
  };

  /*this function will allow the state to be updated at every text input whenever the user types,
      it does this by targeting name value, I used a code snippet from this helpful video
      https://www.youtube.com/watch?v=qH4pJISKeoI&feature=youtu.be*/
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    //set the errors state to a const called errors, then map through them in order to render them in a list format
    const errors = this.state.errors;
    const errorList = errors.map(error => (
      <li key={error.toString()}>{error}</li>
    ));

    return (
      //JSX inside
      <div>
        <hr />
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            <div>
              <div>
                <div className="validation-errors">
                  <ul>{errorList}</ul>
                </div>
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>{" "}
                  {/*add onChange so that we can change state as the user types on all the inputs */}
                  <div>
                    <input
                      value={this.state.title}
                      onChange={e => this.change(e)}
                      id="title"
                      name="title"
                      type="text"
                      className="input-title course--title--input"
                      placeholder="Course title..."
                    />
                  </div>
                  <p>{localStorage.user}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      value={this.state.description}
                      onChange={e => this.change(e)}
                      id="description"
                      name="description"
                      placeholder="Course description..."
                    />
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          value={this.state.estimatedTime}
                          onChange={e => this.change(e)}
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          className="course--time--input"
                          placeholder="Hours"
                        />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          value={this.state.materialsNeeded}
                          onChange={e => this.change(e)}
                          id="materialsNeeded"
                          name="materialsNeeded"
                          placeholder="List materials..."
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Create Course
                </button>
                <NavLink to="/" className="button button-secondary">
                  Cancel
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCourse;
