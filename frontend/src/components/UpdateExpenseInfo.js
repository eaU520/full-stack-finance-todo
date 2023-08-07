import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const UpdateExpenseInfo = () => {
  const [form, setForm] = useState({
      name: "",
      amount:0,
      type:'',
      description:'',
      dueDate:'',
      urgency:'',
      funded:false
  });

  const navigate = useNavigate();

  function updateForm(value){
    return setForm((prev)=> {
      return {...prev, ...value};
    });
  }
  
    function componentDidMount() {
      // console.log("Print id: " + this.props.match.params.id);
      axios
        .get('http://localhost:8082/api/expenses/'+this.props.match.params.id)
        .then(res => {
          // this.setState({...this.state, book: res.data})
          this.setState({
            name: this.state.name,
            amount: this.state.amount,
            type: this.state.type,
            description: this.state.description,
            due_date: this.state.due_date,
            urgency: this.state.urgency
          })
        })
        .catch(err => {
          console.log("Error from UpdateExpenseInfo");
        });
        navigate('/', {replace: true});
    };
  
    function onChange(e){
      this.setState({ [e.target.name]: e.target.value });
    };
  
    function onSubmit(e) {
      e.preventDefault();
  
      const data = {
            name: this.state.name,
            amount: this.state.amount,
            type: this.state.type,
            description: this.state.description,
            due_date: this.state.due_date,
            urgency: this.state.urgency
      };
  
      axios
        .put('http://localhost:5050/expense/expenses/'+this.props.match.params.id, data)
        .then(res => {
          this.props.history.push('/show-expense/'+this.props.match.params.id);
        })
        .catch(err => {
          console.log("Error in UpdateExpenseInfo!");
        })
    };
  
  
      return (
        <div className="UpdateExpenseInfo">
          <Link className="btn btn-link" to="expense/create_expense">Create an Expense</Link> |
            <Link className="btn btn-link" to="/user/login">Login</Link> |
            <Link className="btn btn-link" to="/">View All Expenses</Link> |
            <Link className="btn btn-link" to="/user/resgister">Calendar-In progress</Link> 
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <br />
                <Link to="/" className="btn btn-outline-warning float-left">
                    Show Expense List
                </Link>
              </div>
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Edit Expense</h1>
                <p className="lead text-center">
                    Update Expense's Info
                </p>
              </div>
            </div>
  
            <div className="col-md-8 m-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor="name">Name</label>
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
              <label htmlFor="amount">Amount</label>
                <input
                  type='tnumberext'
                  placeholder='Amount'
                  name='amount'
                  className='form-control'
                  value={this.state.amount}
                  onChange={this.onChange}
                />
              </div>

              <div className='form-group'>
              <label htmlFor="description">Description</label>
                <input
                  type='text'
                  placeholder='Describe this book'
                  name='description'
                  className='form-control'
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </div>
  
              <div className='form-group'>
              <label htmlFor="published_date">Due Date</label>
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
              <label htmlFor="type">Type</label>
                <input
                  type='text'
                  placeholder='Type of this Expense'
                  name='type'
                  className='form-control'
                  value={this.state.type}
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
              <label htmlFor="urgency">Urgency</label>
                <input
                  type='text'
                  placeholder='Urgency of this Expense'
                  name='urgency'
                  className='form-control'
                  value={this.state.urgency}
                  onChange={this.onChange}
                />
              </div>

              <div className='form-group'>
              <label htmlFor="funded">Funded?</label>
                <input
                  type='checkbox'
                  name='funded'
                  className='form-control'
                  value={this.state.funded}
                  onChange={this.onChange}
                />
              </div>

              <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Book</button>
              </form>
            </div>
  
          </div>
        </div>
      );
    }