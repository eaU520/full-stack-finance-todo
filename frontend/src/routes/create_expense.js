import React from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//TODO: React-dom render deprecated use createRoot
export default function CreateExpense(props) {
let navigate = useNavigate();
const {state} = useLocation();
let editExpenseValue = state !== null? state.editExpenseValue: {};
const [formData, setForm] = useState({
    name: state !== null? editExpenseValue['name']: "",
    amount: state !== null? editExpenseValue['amount']: 0, 
    type: state !== null? editExpenseValue['type']: "",
    description: state !== null? editExpenseValue['description']: "",
    due_date: state !== null? editExpenseValue['due_date']: "",
    urgency: state !== null? editExpenseValue['urgency']: "",
    funded: state !== null && editExpenseValue['funded']? true:false,
    edit: state !== null? state.edit: false,
    id: state !== null? editExpenseValue['_id']: ""
  });
function updateForm(value){
  return setForm((prev) =>{
    return {...prev, ...value};//Updates the form state properties
  });
}


async function onSubmit(data){
  data.preventDefault();
  const newExpense = {...formData};
   //create a new expense
  if (validateExpense(data) === true && newExpense.edit === false){
    await fetch("http://localhost:5050/create-expense",{//TODO: Need await in front of fetch?
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
     //edit the existing expense
  }else if(validateExpense(data) === true && newExpense.edit === true) {
    const edittedExpense = {...formData};
    await fetch(`http://localhost:5050/edit/${edittedExpense.id}`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(edittedExpense),
    })
    .catch(error=>{
      window.alert(error);
      return;
    });
  }
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
          <Link to="/create_expense">Create an Expense</Link> |{" "}
          <Link to="/expenses">Expenses</Link> |{" "}
          {/* <Link to="/register">Register</Link> |{" "}
          <Link to="/login">Login</Link> */}
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
                  value ={formData.name}
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
                  value={formData.amount}
                  className='form-control'
                  onChange={(event) => updateForm({amount: event.target.value})}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Type'
                  value={formData.type}
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
                  value={formData.description}
                  className='form-control'
                  onChange={(event) => updateForm({description: event.target.value})}
                />
              </div>

              <div className='form-group'>
                <input
                  type='date'
                  placeholder='due_date'
                  name='due_date'
                  value={formData.due_date}
                  className='form-control'
                  onChange={(event) => updateForm({due_date: event.target.value})}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Priority of this Expense'
                  name='urgency'
                  value={formData.urgency}
                  className='form-control'
                  onChange={(event) => updateForm({urgency: event.target.value})}
                />
              </div>
              <div className='form-group'>
                <h6>Funded? </h6>
                <input
                  type='checkbox'
                  name='funded'
                  checked={formData.funded}
                  // value={checked}
                  className='form-control'
                  onChange = {(event) => updateForm({funded: event.target.checked})}
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