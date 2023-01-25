import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ToDoComponent from './ToDoComponent';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToDoComponent />
    {/* <App /> */}
  </React.StrictMode>
);