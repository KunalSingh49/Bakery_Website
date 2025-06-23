import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import UserDashboard from './pages/Dashboard/UserDashboard';
import MenuPage from './components/MenuPage';
import PrivateRoute from './components/PrivateRoute';
import CakeCatalog from './components/UserDashboard/Cakes';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/cakes" element={<CakeCatalog/>} />
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Route>
        <Route path="/menu" element={<MenuPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
