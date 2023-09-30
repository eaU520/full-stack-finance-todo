import { Link } from 'react-router-dom';
import '../App.css';
export default function Navigation(){
    // const [navigation, setNavigation] = useState({
    //   currentPage: ''
    // });
    
//     function updateNavigation(value){
//       return setNavigation((prev)=> {
//       return {...prev, ...value};
//     });
//   }

          // navigate('/', {replace: true});
    
    
        return (
          <div className="Navigation">
            <Link className="btn btn-link" to="/expense/create_expense">Create an Expense</Link> |
            <Link className="btn btn-link" to="/user/login">Login</Link> |
            <Link className="btn btn-link" to="/">View All Expenses</Link> |
            <Link className="btn btn-link" to="/user/calendar">Calendar-In progress</Link> 
                  {/* <br /> */}
                  {/* <Link to="/" className="btn btn-outline-warning float-left">
                      Homepage
                  </Link> */}

            </div>
        );
    }