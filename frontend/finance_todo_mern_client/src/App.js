// import { Link } from "react-router-dom";

// export default function App() {
//   return (
//     <div>
//       <h1>Finance Tracker</h1>
//       <nav
//         style={{
//           borderBottom: "solid 1px",
//           paddingBottom: "1rem",
//         }}
//       >
//         <Link to="/create-expense">Create an Expense</Link> |{" "}
//         <Link to="/">View Expenses</Link> |{" "}
//         <Link to="/login">Login</Link>
//       </nav>
//     </div>
//   );
// }

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
        <Link to="/create_expense">Create an Expense</Link> |{" "}
        <Link to="/view_expenses">Expenses</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}