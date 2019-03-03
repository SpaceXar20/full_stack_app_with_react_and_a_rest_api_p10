//this component will have it's own state
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; //import Navlink to create nav links and to put active class on any link that is active


/*This component provides the "Sign In" screen by rendering a form that allows a
 user to sign using their existing account information.

The component also renders a "Sign In" button that when clicked signs in the user and a 
"Cancel" button that returns 
the user to the default route (i.e. the list of courses). */

class UserSignIn extends Component {
    constructor(props) {
      //state for data we want to display from API
      super(props);
      // console.log(this.props)
      this.state = {
        userSign: '' //set initial state to a empty string called userSign
      };
    }   
  
    componentDidMount() {
      
     }
     
     render() {
       const{userSign} = this.state;  //set userSign array with data to this.state 
       return ( //JSX inside
        <div>
      <hr/>
      <div className="bounds"> 
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value="" /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value="" /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><NavLink to='/' className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</NavLink></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <NavLink to='/signup'>Click here</NavLink> to sign up!</p>
        </div>
      </div> 
    </div>
    )
  } 
}
     
     
     export default UserSignIn;
     