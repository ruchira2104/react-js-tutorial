import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import NavBar from './components/NavBar';
import AboutUs from './components/AboutUs';
import Career from './components/Career';
import Details from "./components/Details"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
    <Router>
     <NavBar></NavBar>
      <Routes>
         <Route path='/' element={<Career/>} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/career' element={<Career/>} />
        <Route path='/career/details/:id' element={<Details/>} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
