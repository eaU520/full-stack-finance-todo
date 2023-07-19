import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
// import CreateExpense from "./routes/create_expense";
// import ViewExpenses from "./routes/view_expenses";
// import Login from "./routes/login";
// import Register from "./routes/registration";

// const rootElement = document.getElementById("root");
// render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="create-expense" element={<CreateExpense />} />
//       <Route path="expenses" element={<ViewExpenses/>} />
//       <Route path="register" element={<Register/>} />
//       <Route path="login" element={<Login/>} />
//     </Routes>
//   </BrowserRouter>,
//   rootElement
// );