import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import Navigation from './Navigation';
//TODO: Checkbox logic
export default function CreateExpense() {
  const [form, setForm] = useState({
          name: '',
          amount:0,
          type:'',
          description:'',
          dueDate:'',
          urgency:'',
          funded:false,
          username: sessionStorage.getItem("session")
      });

      const navigate = useNavigate();
    
      function updateForm(value){
        return setForm((prev)=> {
          return {...prev, ...value};
        });
      }
    
     async function onSubmit(e) {
        e.preventDefault();
    
        const newExpense = {...form};
        if (newExpense.funded === "false"){
          newExpense.funded = false;
        }else{
          newExpense.funded = true;
        }
        console.log(newExpense);
        await fetch('http://localhost:5050/expenses',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExpense),
        })
          .catch(error => {
            window.alert(error);
            return;
          });
            setForm({
              name: '',
              urgency:'',
              amount:0,
              description:'',
              dueDate:'',
              type:'',
              funded: false
            });
            navigate('/', {replace: true});//Adds to database
  
      }
    
        return (

          <div className="CreateExpense">
            <Navigation/>
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Add Expense</h1>
                  <p className="lead text-center">
                      Create new expense
                  </p>
    
                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        placeholder="Name of the Expense"
                        id="name"
                        className="form-control"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value})}
                      />
                    </div>
                    <br />
    
                    <div className='form-group'>
                      <input
                        type='number'
                        placeholder='Expense Amount'
                        id='amount'
                        className='form-control'
                        value={form.amount}
                        onChange={(e) => updateForm({ amount: e.target.value})}
                      />
                    </div>
    
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Type'
                        id='type'
                        className='form-control'
                        value={form.type}
                        onChange={(e) => updateForm({ type: e.target.value})}
                      />
                    </div>
    
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Describe this expense'
                        id='description'
                        className='form-control'
                        value={form.description}
                        onChange={(e) => updateForm({ description: e.target.value})}
                      />
                    </div>
    
                    <div className='form-group'>
                      <input
                        type='date'
                        placeholder='dueDate'
                        id='dueDate'
                        className='form-control'
                        value={form.dueDate}
                        onChange={(e) => updateForm({ dueDate: e.target.value})}
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Priority of this Expense'
                        id='urgency'
                        className='form-control'
                        value={form.urgency}
                        onChange={(e) => updateForm({ urgency: e.target.value})}
                      />
                    </div>
                    <div className='form-group'>
                      <h6>Funded? </h6>
                      <input
                        type='checkbox'
                        id='funded'
                        className='form-control'
                        value={form.funded !== "false"}
                        onChange={(e) => updateForm({ funded: e.target.value})}
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