import React , {useState} from 'react'
import Signup from './Components/Signup'
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import { Routes, Route } from 'react-router-dom';

import "./App.css";

const App = () => {

const [token, setToken] = useState("");

  return (

   <div>
  <Routes>
  <Route path='/' element={<Signup setToken={setToken}/>}/>
  <Route path='/login' element={<Login setToken={setToken}/>}/>
  <Route path='/dashboard' element={<Dashboard token={token}/>}/>
  </Routes>
   </div>

  )
  }

export default App