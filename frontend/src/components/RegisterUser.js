import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
//TODO: Validation
//TODO: Using facebook, Google, etc.
export default function CreateUser (){
    const [form, setForm] = useState({
          name: "",
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
              admin: false,
              email: ''
          })
        })
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
                        placeholder='Name'
                        name='name'
                        className='form-control'
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value})}
                      />
                    </div>
                    <br />

                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        className='form-control'
                        value={form.username}
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
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value})}
                      />
                    </div>
    
                    <div className='form-group'>
                      <input
                        type='password'
                        placeholder='Password Again'
                        name='password_again'
                        className='form-control'
                        // onChange={}
                      />
                    </div>

                    <div className='form-group'>
                      <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        className='form-control'
                        value={form.email}
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