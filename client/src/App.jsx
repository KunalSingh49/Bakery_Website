import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import UserDashboard from './pages/Dashboard/UserDashboard';
import MenuPage from './components/MenuPage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/user" element={<UserDashboard/>}/>
        <Route path="/menu" element={<MenuPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
