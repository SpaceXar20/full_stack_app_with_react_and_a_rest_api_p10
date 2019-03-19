//this component will have it's own state
import React, { Component } from 'react';
import axios from "axios";

/*This component provides the "Update Course" screen by rendering a form 
that allows a user to update one of their existing courses. 

The component also renders an "Update Course" button that when clicked 
sends a PUT request to the REST API's  /api/courses/:id route. 

This component also renders a "Cancel" button that returns the user to 
the "Course Detail" screen. */

//I will need initialize state to hold course and user info data just like I did with the CourseInfo component 
class UpdateCourse extends Component {
    constructor(props) {
      super(props);
      this.state = {
        course: [], //the course and user properties contain the current course info before being updated
        user: [],
        title: '', //the properties that have an empty strings will contain the values when the user submits the form to update the form
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
      };
      this.handleSubmit = this.handleSubmit.bind(this); //bind handleSubmit and handleCancel to the class in order to use it with (this)
      this.handleCancel = this.handleCancel.bind(this);
    } 
    
    
    /*this function will allow the state to be updated at every text input whenever the user types,
      it does this by targeting name value, I used a code snippet from this helpful video
      https://www.youtube.com/watch?v=qH4pJISKeoI&feature=youtu.be*/
      change = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

     //this function will handle the form submission to send a put request
     handleSubmit = event => {
      const {match: { params }} = this.props;
      event.preventDefault();

      const updateCourse = {
        title: this.state.title,
        description: this.state.description,
        estimatedTime: this.state.estimatedTime,
        materialsNeeded: this.state.materialsNeeded
      };

      axios({
        method: 'put',
        url: `http://localhost:5000/api/courses/${params.id}`,
        auth: {
          username: window.localStorage.getItem('Email'),
          password: window.localStorage.getItem('Password')
       },
        data: updateCourse
        }).then(
          alert('The course has been successfully updated!')
        ).then( () => {
          const {  history } = this.props;
          history.push(`/`)
        }).catch( err => { //use a catch method to catch the errors and display them is the status code comes back as 400
          console.log("CATCH =", err.response.data.errors);
          this.setState({ //if there were errors, then set the errors state in react to the error messages that came from the REST API
            errors: err.response.data.errors
          })
        });
    };

    //this function will handle the cancel button so that the user is redirected to the course info page when they click on cancel
    handleCancel = event => {
      const { match: { params }, history } = this.props;
      const { course } = this.state;
      event.preventDefault();
      history.push(`/courses/${course._id}`)
    }

  
    /*  The library passes in a prop called match into every route that is rendered. Inside this match object is another object called params
   this holds all matching params where the key is the name we specified when creating the route and the value is the actual value in the URL.  */
   componentDidMount() {
    const {match: { params }} = this.props; //I used a code snippet from this video https://scotch.io/courses/using-react-router-4/route-params
    //fetch data from API
    axios
      .get(`http://localhost:5000/api/courses/${params.id}`)
      .then(results => {
        //results param came back as data from api
        this.setState({
          //set state by setting the courses array to hold the data that came from results
          course: results.data,
          user: results.data.user
        });
        //console.log(results); //By console logging I was able to see that I am getting each individual course's info in the data object
      });
  }
     
     render() {
       //set the errors state to a const called errors, then map through them in order to render them in a list format
    const errors = this.state.errors; 
    const errorList = errors.map((error) =>
      <li key={error.toString()}>{error}</li>);

      const { course, user } = this.state;;  //set courses and user to this.state

       return ( //JSX inside
        <div>
        <hr />
        <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div className="validation-errors">
              <ul>{errorList}</ul>
            </div>
          <div>
            <form onSubmit={ this.handleSubmit}>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={course.title}  onChange={e => this.change(e)} /></div>
                  <p>By {user.firstName} {user.lastName}</p>
                </div>
                <div className="course--description">
                  <div><textarea id="description" name="description"  placeholder={this.state.course.description} onChange={e => this.change(e)}/> </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={this.state.course.estimatedTime} onChange={e => this.change(e)} /></div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder={this.state.course.materialsNeeded}  onChange={e => this.change(e)} /></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={this.handleCancel}>Cancel</button></div>
            </form>
          </div>
        </div>
      </div> 
     );
    } 
   }
     
     
     export default UpdateCourse;