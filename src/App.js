import React from 'react';
import { Dashboard } from './pages/dashboard';
import { UserForm } from './pages/userForm';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<UserForm />} />
        <Route path="/user/:id" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App