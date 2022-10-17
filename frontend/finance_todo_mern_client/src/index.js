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
      <Route path="expenses" element={<ViewExpenses/>} />
      <Route path="login" element={<Login/>} />
    </Routes>
  </BrowserRouter>,
  rootElement
);