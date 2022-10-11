import React from 'react';

export default function Login() {
  const loginUser = (data) => {
    data.preventDefault();
    //TODO: validate and login
  }
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Login</h2>

        <form onSubmit={e => {loginUser(e)}}>
        <label>Username</label>
        <br />
        <input 
          name='userName' 
          type='text' 
        />
        <br />
        <label>Password</label>
        <br />
        <input
          name='password' 
          type='password'
        />
        <br/>
        <input 
          className='submitButton'
          type='submit' 
          value='Log In' 
        />
      </form>

      </main>
    );
  }