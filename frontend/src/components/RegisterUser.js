import React, { useState } from "react";
import Navigation from './Navigation';

import '../App.css';
//TODO: Using facebook, Google, etc.
const CreateUser = (props) => {
    const [form, setForm] = useState({
          name: "",
          username: "",
          password:"",
          passwordAgain:"",
          admin: false,
          email: ""
    });
    
    function updateForm(value){
      return setForm((prev)=> {
        if(value.password !== value.passwordAgain){
          console.log("Error");
        }
        return {...prev, ...value};
      });
    }
    
      async function onSubmit (e){
        e.preventDefault();
       
        const data = { ...form};

        await fetch('http://localhost:5050/user/register',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        .then(res => {
            setForm({
              name: '',
              username: '',
              password:'',
              passwordAgain: '',
              admin: false,
              email: ''
          })
        })
      };
    
        return (
          <div className="Registration">
            <Navigation/>
                  {/* <br />
                  <Link to="/" className="btn btn-outline-warning float-left">
                      Show Expense List
                  </Link> */}
                  <h1 className="display-4 text-center">Add User</h1>
                  <p className="lead text-center">
                      Create new user
                  </p>
    
                  <form onSubmit={onSubmit}>
                  <div className='form-group has-validation'>
                      <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        className='form-control'
                        value={form.name}
                        autoComplete="name"
                        onChange={(e) => updateForm({ name: e.target.value})}
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a name.
                      </div>
                    </div>
                    <br />

                    <div className='form-group has-validation'>
                      <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        className='form-control'
                        value={form.username}
                        autoComplete="off"
                        onChange={(e) => updateForm({ username: e.target.value})}
                        required
                      />
                    </div>
                    <br />
    
                    <div className='form-group has-validation'>
                      <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        className='form-control'
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value})}
                        required
                      />
                    </div>
    
                    <div className='form-group has-validation'>
                      <input
                        type='password'
                        placeholder='Type your password Again'
                        name='passwordAgain'
                        className='form-control'
                        value={form.passwordAgain}
                        onChange={(e) => updateForm({ passwordAgain: e.target.value})}
                        required
                      />
                    </div>

                    <div className='form-group has-validation'>
                      <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        className='form-control'
                        value={form.email}
                        autoComplete="email"
                        onChange={(e) => updateForm({ email: e.target.value})}
                        required
                      />
                    </div>
    
                    
                    <input
                        type="submit"
                        className="btn btn-outline-warning btn-block mt-4"
                    />
                  </form>
              </div>

        );
}
export default CreateUser; 