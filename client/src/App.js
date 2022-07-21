import './App.css';
import Home from './components/Home/Home';
import {  Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing'


function App() {
  return (<div className='App'>
    <Switch>

      <Route exact path= '/' component={Landing}></Route>

      <Route path='/home' component={Home}></Route>

    </Switch>

  </div>

  );
}

export default App;
