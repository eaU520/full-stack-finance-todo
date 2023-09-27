import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import Navigation from './Navigation';
import {Link} from 'react-router-dom';

export default function LoginUser(){
    var session;
    const [login, setLogin] = useState({
      username: session !== undefined ? session.username: '',
      password: session !== undefined ? session.password: ''
    });
    
    function updateLogin(value){
      return setLogin((prev)=> {
      return {...prev, ...value};
    });
  }
    
      async function onSubmit(e) {
        e.preventDefault();
        axios
          .post('http://localhost:5050/user/login', login)
          .then(res => {
            this.setState({
                username: '',
                password:''
            })
            session = res;
            JSON.parse((localStorage.setItem("currentSession",session)));
            // this.props.history.push('/');//TODO: History, breadcrumbs?
          })
          .catch(err => {
            console.log("Error in Login!", err);
          });

          // navigate('/', {replace: true});
      }
    
        return (
          <div className="Login">
            <Navigation/> 
                  <h1 className="display-4 text-center">Account Access</h1>
                  <p className="lead text-center">
                      Login
                  </p>

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
                        autoComplete="username"
                        onChange={(e) => updateLogin({ username: e.target.username})}
                      />
                    </div>
                    <br />
    
                    <div className='form-group'>
                      <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        className='form-control'
                        value={login.password}
                        onChange={(e) => updateLogin({password: e.target.password})}
                      />
                    </div>
                    <Link to="/user/register">Register</Link><br/>
                    <Link to="/user/forgot">Forgot Password</Link>
                    <input
                        type="submit"
                        className="btn btn-outline-warning btn-block mt-4"
                    />
                  </form>
              </div>

        );
    }