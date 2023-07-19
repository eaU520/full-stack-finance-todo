import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { withRouter } from "react-router";
//TODO: Validation
class CreateUser extends Component{
    constructor() {
        super();
        this.state = {
          username: '',
          password:'',
          admin: false,
          email: ''
        };
      }
    
      onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      onSubmit = e => {
        e.preventDefault();
    
        const data = {
            username: this.state.username,
            password: this.state.password,
            admin: this.state.admin,
            email: this.state.email
        };
    
        axios
          .post('http://localhost:8082/api/expenses', data)
          .then(res => {
            this.setState({
                username: '',
                password:'',
                admin: false,
                email: ''
            })
            this.props.history.push('/');//Adds to database FIXME: What is this error?
          })
          .catch(err => {
            console.log("Error in Registration!");
          })
      };
    
      render() {
        return (
          <div className="Registration">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br />
                  <Link to="/" className="btn btn-outline-warning float-left">
                      Show Expense List
                  </Link>
                </div>
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Add User</h1>
                  <p className="lead text-center">
                      Create new user
                  </p>
    
                  <form noValidate onSubmit={this.onSubmit}>
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
    
                    <div className='form-group'>
                      <input
                        type='password'
                        placeholder='Password Again'
                        name='password_again'
                        className='form-control'
                        onChange={this.onChange}//Don't need?
                      />
                    </div>

                    <div className='form-group'>
                      <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        className='form-control'
                        value={this.state.email}
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
}

export default withRouter(CreateUser);