import React from "react";
import { useState } from 'react';
import '../App.css';
import Navigation from './Navigation';
import {Link, useNavigate} from 'react-router-dom';

const LoginUser = (props) => {
    // var session;
    const [login, setLogin] = useState({
      // username: props.session !== undefined ? props.session.username: ''
      //TODO: sessions
      // password: session !== undefined ? session.password: '' Don't use this
      username: "",
      password: ""
    });
    const navigate = useNavigate();
    function updateLogin(value){
      return setLogin((prev)=> {
      return {...prev, ...value};
    });
  }
    
      async function onSubmit(e) {
        e.preventDefault();

        const data = { ...login};
        
        await fetch('http://localhost:5050/users/login',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(res => {
            sessionStorage.setItem("session",login.username);
            // JSON.parse((localStorage.setItem("currentSession",props.session)));
            navigate('/', {replace: true});//TODO: History, breadcrumbs?
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
                        defaultValue={login.username}
                        autoComplete="username"
                        onChange={(e) => updateLogin({ username: e.target.value})}
                        required
                      />
                    </div>
                    <br />
    
                    <div className='form-group'>
                      <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        className='form-control'
                        defaultValue={login.password}
                        onChange={(e) => updateLogin({password: e.target.value})}
                        required
                      />
                    </div>
                    <Link to="/users/register">Register</Link><br/>
                    <Link to="/users/forgot">Forgot Password</Link>
                    <input
                        type="submit"
                        className="btn btn-outline-warning btn-block mt-4"
                    />
                  </form>
              </div>

        );
    }
export default LoginUser;