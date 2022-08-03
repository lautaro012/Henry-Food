import './App.css';
import {  Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing'
import RecipeDetails from './components/RecipeDetails/RecipeDetails'
import CreateRecipe from './components/CreateRecipe/CreateRecipe'
import dotenv from "dotenv";
import axios from 'axios'
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";


function App() {
  return (<div className='App'>
    

        <Route exact path= '/' component={Landing}></Route>

        <Route path='/home' component={Home}></Route>

        <Route path= '/CreateRecipe' component={CreateRecipe}></Route>

        <Route path='/Recipe/:id' component={RecipeDetails} ></Route>


  </div>

  );
}

export default App;
