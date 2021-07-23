import React, { useState, createContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import NavBar from './components/NavBar/NavBar';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/login/Login';
import { getDecodedUser } from './pages/login/logInManager';
import { Toaster } from 'react-hot-toast';


export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(getDecodedUser());

  console.log(user);
  return (
    <UserContext.Provider value={{user, setUser}}>
      <Toaster/>
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
    </UserContext.Provider>
  );
}

export default App;
