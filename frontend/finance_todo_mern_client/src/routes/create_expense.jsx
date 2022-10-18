import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateExpense() {

const [formData, setForm] = useState({
  name: "",
  amount: 0, 
  type: "",
  description: "",
  due_date: "",
  urgency: "",
  funded: false,
});

const navigate = useNavigate();//TODO: Need this, what for?
function updateForm(value){
  return setForm((prev) =>{
    return {...prev, ...value};//Updates the form state properties
  });
}


async function onSubmit(data){
  data.preventDefault();
  const newExpense = {...formData};
  if (validateExpense(data) === true){
    await fetch("http://localhost:8080/create-expense",{//TODO: Need await in front of fetch?
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newExpense),
    })
    .catch(error=>{
      window.alert(error);
      return;
    });
    setForm(
      {
        name: "",
        amount: 0, 
        type: "",
        description: "",
        due_date: "",
        urgency: "",
        funded: ""
      });//Clear the form
    navigate("/expenses");//Goes to the list of expenses
  }
}
//TODO: Validate expense form
function validateExpense(data){
  if (data.name === "" || !isNaN(data.amount) || data.type === "" ||
      data.description === "" || data.due_date === "" || data.urgency === ""||
      data.funded === ""){
        alert("Please fill in all fields");
        return false;
      }
  return true;
}

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

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name of the Expense'
                  name='name'
                  className='form-control'
                  onChange={(event) => updateForm({name: event.target.value})}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='number'
                  placeholder='Amount'
                  name='amount'
                  className='form-control'
                  onChange={(event) => updateForm({amount: event.target.value})}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Type'
                  name='type'
                  className='form-control'
                  onChange={(event) => updateForm({type: event.target.value})}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Describe this expense'
                  name='description'
                  className='form-control'
                  onChange={(event) => updateForm({description: event.target.value})}
                />
              </div>

              <div className='form-group'>
                <input
                  type='date'
                  placeholder='due_date'
                  name='due_date'
                  className='form-control'
                  onChange={(event) => updateForm({due_date: event.target.value})}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Priority of this Expense'
                  name='urgency'
                  className='form-control'
                  onChange={(event) => updateForm({urgency: event.target.value})}
                />
              </div>
              <div className='form-group'>
                <h6>Funded? </h6>
                <input
                  type='checkbox'
                  name='funded'
                  className='form-control'
                  onChange={(event) => updateForm({funded: event.target.value})}
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