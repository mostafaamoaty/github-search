import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Repositories from './pages/repositories';
import MainLayout from './layouts/main';
import Users from './pages/users';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />} >
          <Route index element={<Users />} />
          <Route path='/users' element={<Users />} />
          <Route path='/repos' element={<Repositories />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
