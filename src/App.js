import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,


} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import NOtFound from './components/NOtFound/NOtFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Product from './components/Product/Product';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shipment from './components/Shipment/Shipment';
import Shop from './components/Shop/Shop';

export const UserContext = createContext();

function App(props) {

  const [loggedinUser, setLoggedinUser] = useState({});
  return (
    <UserContext.Provider value ={[loggedinUser, setLoggedinUser]}>
 
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>

          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
          <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NOtFound></NOtFound>
          </Route>
        </Switch>
      </Router>
    
    </UserContext.Provider>
  );
}

export default App;
