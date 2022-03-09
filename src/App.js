
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Checkout from './Checkout';
import Login from './Login';
import { useEffect, useState } from 'react';
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useStatevalue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import CreateProduct from './CreateProduct';
import CreateUser from './CreateUser';


const promise=loadStripe("pk_test_51KPe9ESJ2Ao6OkPJATqwXh9eLvVsq699f5eFMyT4zvl6fvqYmyud3U1xONvOMKDwTOtCXlO1M8P2BBIYaQ60NDeJ00tXvnfcQq")


function App() {
  const [{ }, dispatch] = useStatevalue();
  // const [users,setUser]=useState({})
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {


      if (currentUser) {
        dispatch({
          type: "SET_USER",
          user: currentUser
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null

        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="app">

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/createUser">
            <CreateUser/>
          </Route>
          <Route path="/createProduct">
            <Header />
            <CreateProduct />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
            <Payment/>
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
          
        </Switch>
      </div>

    </Router>
  );
}

export default App;
