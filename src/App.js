import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/Home'
import Callback from './pages/Callback'

function App() {
  return  (
    <div>
      <BrowserRouter>
        <Route exact path='/' component={Home}/>
        <Route path="/lyrics" component={Callback} />
      </BrowserRouter>
    </div>
  )
}

export default App;
