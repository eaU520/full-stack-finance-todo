import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
//TODO: Validation
export default function LoginUser(){
    const [login, setLogin] = useState({
      username: "",
      password: ""
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
            // this.props.history.push('/');//TODO: History, breadcrumbs?
          })
          .catch(err => {
            console.log("Error in Login!");
          });
          // navigate('/', {replace: true});
      };
    
        return (
          <div className="Login">
            <Link className="btn btn-link" to="expense/create_expense">Create an Expense</Link> |
            <Link className="btn btn-link" to="/user/login">Login</Link> |
            <Link className="btn btn-link" to="/">View All Expenses</Link> |
            <Link className="btn btn-link" to="/user/calendar">Calendar-In progress</Link> 
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br />
                  <Link to="/" className="btn btn-outline-warning float-left">
                      Homepage
                  </Link>
                </div>
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Account Access</h1>
                  <p className="lead text-center">
                      Login
                  </p>
    {/* TODO: noValidate? */}
                  <form onSubmit={onSubmit}>
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        className='form-control'
                        value={login.username}
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
                    <input
                        type="submit"
                        className="btn btn-outline-warning btn-block mt-4"
                    />
                  </form>
              </div>
              </div>
            </div>
          </div>
        );
}