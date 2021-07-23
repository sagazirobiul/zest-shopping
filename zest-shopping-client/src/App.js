import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import NavBar from './components/NavBar/NavBar';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';

function App() {
  return (
    <Router>
        <NavBar/>
        <Switch>
          <Route path="/product/:id">
            <ProductDetails/>
          </Route>
          <Route path="/cart">
            <Cart/>
          </Route>
          <Route path="/orders">
            <Orders/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
