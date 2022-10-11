// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//       <BrowserRouter>
//       <App />
//       </BrowserRouter>
//     </React.StrictMode>
  
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import CreateExpense from "./routes/create_expense";
import ViewExpenses from "./routes/view_expenses";
import Login from "./routes/login";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="create_expense" element={<CreateExpense />} />
      <Route path="view_expenses" element={<ViewExpenses/>} />
      <Route path="login" element={<Login/>} />
    </Routes>
  </BrowserRouter>,
  rootElement
);