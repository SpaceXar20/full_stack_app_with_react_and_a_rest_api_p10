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
        confirmPassword: ''
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
        confirmPassword: this.state.confirmPassword
      };

      axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/',
        data: newUser
        }).then(
          alert('Your account was successfully created!')
        ).then( () => {
          const {  history } = this.props;
          history.push(`/`)
        })
    };


    /*this function will allow the state to be updated at every text input whenever the user types,
      it does this by targeting name value, I used a code snippet from this helpful video
      https://www.youtube.com/watch?v=qH4pJISKeoI&feature=youtu.be*/
      change = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

     
     render() {
       return ( //JSX inside
        <div>
        <hr />
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
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
     