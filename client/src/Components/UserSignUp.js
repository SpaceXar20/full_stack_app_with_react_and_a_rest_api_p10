//this component will have it's own state
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; //import Navlink to create nav links and to put active class on any link that is active
import axios from "axios";

/*This component provides the "Sign Up" screen by rendering a form that allows 
a user to sign up by creating a new account. 

The component also renders a "Sign Up" button 
that when clicked sends a POST request to the REST API's /api/users route and signs in the user.

This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).*/

class UserSignUp extends Component {
    constructor(props) {
      super(props); //the properties in empty strings will hold the values for the new user upon submission
      this.state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []//this property will hold the errors sent from the rest api
      };
      this.handleSubmit = this.handleSubmit.bind(this); //bind handleSubmit  to the class in order to use it with (this)
    }   

    //this method will be used to create a new user by sending a post request to localhost:5000/api/users/
    handleSubmit = event => {
      event.preventDefault();

      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      };

      if (this.state.password !== this.state.confirmPassword) { //if the password and the confirm passwords don't match then render an alert, if they do match continue making the API request
        alert("Passwords don't match");
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/',
        data: newUser
        }).then(response => { //if the response came back as 201("Created"), then alert the user that the course was successfully created, if another code came back then redirect them to the error handler
        if (response.status === 201) {
          alert("Your account was successfully created!");
          this.props.history.push("/signin");
        } else {
          throw new Error();
        } 
      }).catch(err => {
        //use a catch method to catch the errors and display them is the status code comes back as 400
        console.log("CATCH =", err.response.data.errors);
        this.setState({
          //if there were errors, then set the errors state in react to the error messages that came from the REST API
          errors: err.response.data.errors
        });
      }); // make API call
    }
}
      
  
     


    /*this function will allow the state to be updated at every text input whenever the user types,
      it does this by targeting name value, I used a code snippet from this helpful video
      https://www.youtube.com/watch?v=qH4pJISKeoI&feature=youtu.be*/
      change = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

     
      
     render() {
    //set the errors state to a const called errors, then map through them in order to render them in a list format
    const errors = this.state.errors; 
    const errorList = errors.map((error) =>
      <li key={error.toString()}>{error}</li>);

       return ( //JSX inside
        <div>
        <hr />
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <div className="validation-errors">
              <ul>{errorList}</ul>
            </div>
          </div>
            <div>
            <form onSubmit={this.handleSubmit}>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={this.state.firstName} onChange={e => this.change(e)} /></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={this.state.lastName} onChange={e => this.change(e)} /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={e => this.change(e)} /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={e => this.change(e)} /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={e => this.change(e)} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><NavLink to='/' className="button button-secondary">Cancel</NavLink></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <NavLink to='/signin'>Click here</NavLink> to sign in!</p>
        </div>
      </div>
    </div>
     );
    } 
   }
    
     
     export default UserSignUp;
     