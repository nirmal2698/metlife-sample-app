import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ToDoComponent from './ToDoComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToDoComponent />
  </React.StrictMode>
);