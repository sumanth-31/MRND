import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Components/navbar'
import Body from './Components/Body/Body'
import {Route} from 'react-router-dom'
import TopTen from './Components/TopTen/TopTen'
class  App extends Component {

  render()
  {
     return (
      <div>
      <Navbar image={logo}></Navbar>
      <div>
      <Route path='/' exact render={()=><Body></Body>}></Route>
      <Route path='/topten' render={()=><TopTen></TopTen>}></Route>
      </div>
      </div>
    );
  }
 
}

export default App;
