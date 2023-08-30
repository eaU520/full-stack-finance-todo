import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import Navigation from './Navigation';
import {Link} from 'react-router-dom';

//TODO: Validation
export default function ForgotPassword(){
    const [user, setUser] = useState({
      username: session !== undefined ? session.username: ''
    });
    
    function updateUser(value){
      return setUser((prev)=> {
      return {...prev, ...value};
    });
  }
    
      async function onSubmit(e) {
        e.preventDefault();
        axios
          .post('http://localhost:5050/user/forgot', user)
          .then(res => {
            this.setState({
                username: ''
            })
          })
          .catch(err => {
            console.log("Error in Username!", err);
          });

          // navigate('/', {replace: true});
      }
    
        return (
          <div className="Forgot">
            <Navigation/> 
                  <h1 className="display-4 text-center">Account Access</h1>
                  <p className="lead text-center">
                      Enter Username to receive temporary password to the registered email
                  </p>
                  
    {/* TODO: noValidate? */}
                  <form onSubmit={onSubmit}>
                    <div className='form-group'>
                      <input
                      //  <label htmlFor="name">Name</label>TODO: label htmlFOr
                      //TODO: Labels for accessibility
                        type='text'
                        placeholder='Username'
                        name='username'
                        className='form-control'
                        value={login.username}
                        onChange={(e) => updateUser({ username: e.target.username})}
                      />
                    </div>
                    <br />
                    <input
                        type="submit"
                        className="btn btn-outline-warning btn-block mt-4"
                    />
                  </form>
              </div>

        );
    }