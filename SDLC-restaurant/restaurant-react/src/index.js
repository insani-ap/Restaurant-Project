import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { Provider } from 'react-redux';
// import { Counter } from "./Redux/Counter"
import { store } from './Redux/Store';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />

      {/* <Counter /> */}
    </Provider>

  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
