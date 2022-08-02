import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import QuestionList from "./features/questions/List";
import SingleQuestion from "./features/questions/SingleQuestion";
import CreateForm from "./features/questions/CreateForm";
import EditForm from "./features/questions/EditForm";
import { store } from "./store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<App />} />
            <Route path="/questions">
              <Route index element={<QuestionList />} />
              <Route path=":id" element={<SingleQuestion />} />
              <Route path="create" element={<CreateForm />} />
              <Route path="edit/:id" element={<EditForm />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
