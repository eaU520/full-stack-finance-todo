import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
// import { withRouter } from "react-router";
//TODO: Validation
export default function LoginUser(){
    
      async function onSubmit(e) {
        e.preventDefault();
    
        const data = {
            username: this.state.username,
            password: this.state.password
        };
    
        axios
          .post('http://localhost:5050/user/', data)
          .then(res => {
            this.setState({
                username: '',
                password:''
            })
            // this.props.history.push('/');//TODO: History, breadcrumbs?
          })
          .catch(err => {
            console.log("Error in Login!");
          })
      };
    
        return (
          <div className="Login">
            <Link className="btn btn-link" to="expense/create_expense">Create an Expense</Link> |
            <Link className="btn btn-link" to="/user/login">Login</Link> |
            <Link className="btn btn-link" to="/">View All Expenses</Link> |
            <Link className="btn btn-link" to="/user/resgister">Calendar-In progress</Link> 
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br />
                  <Link to="/" className="btn btn-outline-warning float-left">
                      Homepage
                  </Link>
                </div>
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Add User</h1>
                  <p className="lead text-center">
                      Login
                  </p>
    
                  <form noValidate onSubmit={onSubmit}>
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        className='form-control'
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                    </div>
                    <br />
    
                    <div className='form-group'>
                      <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        className='form-control'
                        value={this.state.password}
                        onChange={this.onChange}
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