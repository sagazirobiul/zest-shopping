import React, { useState, createContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import NavBar from './components/NavBar/NavBar';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders';
import Login from './pages/login/Login';
import { getDecodedUser } from './pages/login/logInManager';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute';
import OrderForm from './components/OrderForm';


export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(getDecodedUser());
  const [cartProducts, setCartProducts] = useState([])

  return (
    <UserContext.Provider value={{user, setUser, cartProducts, setCartProducts}}>
      <Toaster/>
      <Router>
          <NavBar/>
          <Switch>
            <PrivateRoute path="/product/:id">
              <ProductDetails/>
            </PrivateRoute>
            <PrivateRoute path="/orderForm">
              <OrderForm/>
            </PrivateRoute>
            <PrivateRoute path="/cart">
              <Cart/>
            </PrivateRoute>
            <PrivateRoute path="/orders">
              <Orders/>
            </PrivateRoute>
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
