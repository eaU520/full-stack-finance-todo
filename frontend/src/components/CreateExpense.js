import { set } from 'mongoose';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
// import '../App.css';
// import { withRouter } from "react-router";
//TODO: Clean up node_modules
export default function CreateExpense() {
  const [form, setForm] = useState({
          name: "",
          amount:0,
          type:'',
          description:'',
          due_date:'',
          urgency:'',
          funded:false
      });

      const navigate = useNavigate();
    
      function updateForm(value){
        return setForm((prev)=> {
          return {...prev, ...value};
        });
      }

      onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      onSubmit = e => {
        e.preventDefault();
    
        const data = {
            name: this.state.name,
            amount: this.state.amount,
            type: this.state.type,
            description: this.state.description,
            due_date: this.state.due_date,
            urgency: this.state.urgency,
            funded: this.state.funded
        };
    
        axios
          .post('http://localhost:8082/api/expenses', data)
          .then(res => {
            this.setState({
              name: '',
              urgency:'',
              amount:0,
              description:'',
              due_date:'',
              type:'',
              funded: false
            })
            this.props.history.push('/');//Adds to database FIXME: What is this error?
          })
          .catch(err => {
            console.log("Error in CreateExpense!");
          })
      };
    
        return (
          <div className="CreateExpense">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br />
                  <Link to="/" className="btn btn-outline-warning float-left">
                      Show Expense List
                  </Link>
                </div>
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Add Expense</h1>
                  <p className="lead text-center">
                      Create new expense
                  </p>
    
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Name of the Expense'
                        name='name'
                        className='form-control'
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                    </div>
                    <br />
    
                    <div className='form-group'>
                      <input
                        type='number'
                        placeholder='amount'
                        name='amount'
                        className='form-control'
                        value={this.state.amount}
                        onChange={this.onChange}
                      />
                    </div>
    
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Type'
                        name='type'
                        className='form-control'
                        value={this.state.type}
                        onChange={this.onChange}
                      />
                    </div>
    
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Describe this expense'
                        name='description'
                        className='form-control'
                        value={this.state.description}
                        onChange={this.onChange}
                      />
                    </div>
    
                    <div className='form-group'>
                      <input
                        type='date'
                        placeholder='due_date'
                        name='due_date'
                        className='form-control'
                        value={this.state.due_date}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Priority of this Expense'
                        name='urgency'
                        className='form-control'
                        value={this.state.urgency}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className='form-group'>
                      <h6>Funded? </h6>
                      <input
                        type='checkbox'
                        name='funded'
                        className='form-control'
                        value={this.state.funded}
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