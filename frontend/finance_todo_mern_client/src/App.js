import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Financial Todo</h1>
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
  );
}//TODO: Extra nav to separate Navbar component