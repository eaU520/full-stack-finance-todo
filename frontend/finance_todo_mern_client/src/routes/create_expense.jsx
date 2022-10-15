import React from 'react';
import { Link } from 'react-router-dom';

export default function CreateExpense() {
//     render() {
  return (
    <div className="CreateExpense">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
          <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}>
          <Link to="/">Homepage</Link> |{" "}
          <Link to="/create-expense">Create an Expense</Link> |{" "}
          <Link to="/expenses">Expenses</Link> |{" "}
          <Link to="/login">Login</Link>
        </nav>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add Expense</h1>
            <p className="lead text-center">
                Create new expense
            </p>

            <form noValidate onSubmit={event =>{validateExpense(event)}}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name of the Expense'
                  name='name'
                  className='form-control'
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='number'
                  placeholder='Amount'
                  name='amount'
                  className='form-control'
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Type'
                  name='type'
                  className='form-control'
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Describe this expense'
                  name='description'
                  className='form-control'
                />
              </div>

              <div className='form-group'>
                <input
                  type='date'
                  placeholder='due_date'
                  name='due_date'
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Priority of this Expense'
                  name='urgency'
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <h6>Funded? </h6>
                <input
                  type='checkbox'
                  name='funded'
                  className='form-control'
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
//TODO: Validate expense form
function validateExpense(data){

}