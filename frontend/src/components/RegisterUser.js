import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
//TODO: Validation
//TODO: Using facebook, Google, etc.
export default function CreateUser (){
    const [form, setForm] = useState({
          username: "",
          password:"",
          admin: false,
          email: ""
    });
    
    function updateForm(value){
      return setForm((prev)=> {
        return {...prev, ...value};
      });
    }
    
      function onSubmit (e){
        e.preventDefault();
       
        const data = { ...form};
    
        axios
          .post('http://localhost:5050/user/register', data)
          .then(res => {
            this.setState({
                username: '',
                password:'',
                admin: false,
                email: ''
            })
            // this.props.history.push('/');//Adds to database FIXME: What is this error?
          })
          .catch(err => {
            console.log("Error in Registration!");
          });
          // navigate('/', {replace: true});
      };
    
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
    
                  <form noValidate onSubmit={onSubmit}>
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        className='form-control'
                        value={this.state.name}
                        onChange={(e) => updateForm({ username: e.target.value})}
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
                        onChange={(e) => updateForm({ password: e.target.value})}
                      />
                    </div>
    
                    <div className='form-group'>
                      <input
                        type='password'
                        placeholder='Password Again'
                        name='password_again'
                        className='form-control'
                        onChange={(e) => updateForm({ password: e.target.value})}
                      />
                    </div>

                    <div className='form-group'>
                      <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        className='form-control'
                        value={this.state.email}
                        onChange={(e) => updateForm({ email: e.target.value})}
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