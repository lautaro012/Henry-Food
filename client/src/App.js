import './App.css';
import {  Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing'
import RecipeDetails from './components/RecipeDetails/RecipeDetails'
import CreateRecipe from './components/CreateRecipe/CreateRecipe'
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (<div className='App'>
    <BrowserRouter>
      <Switch>

        <Route exact path= '/' component={Landing}></Route>

        <Route path='/home' component={Home}></Route>

        <Route path= '/CreateRecipe' component={CreateRecipe}></Route>

        <Route path='/Recipe/:id' component={RecipeDetails} ></Route>

      </Switch>
    </BrowserRouter>

  </div>

  );
}

export default App;
