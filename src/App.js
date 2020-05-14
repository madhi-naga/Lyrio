import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/Home';
import Lyrics from './pages/Lyrics';

// import { Provider } from './Context';


function App() {
  return  (
      <BrowserRouter>
        <Route exact path='/' component={Home}/>
        <Route path="/lyrics" component={Lyrics} />
      </BrowserRouter>

  )
}

export default App;
