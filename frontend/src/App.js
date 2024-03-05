// import react from 'react'
// import Test from './test.js'
// import New from "./New.js"
// import "./index.css"
// import { useState, useEffect } from 'react'
// import { dblClick } from '@testing-library/user-event/dist/click.js'
// const y= 56
// function App(prop){

//   const te=['a','b','c']

//   function ff(b){
//     te.push(b)
//     console.log(te)
//   }
  // const [ala, b]= useState(null);
  // const [load, setl]= useState(true)
  // function cli(){
  //   b(ala.filter((rr)=>{
  //     return rr.t=== 23
  //   }))
  // }
  // function cli(e){
  
  //   b(49)
  //   console.log(e.target)
  // }
  // useEffect(()=>{
  //   fetch("http://localhost:3000/db.json")
  //   .then((res)=>{
  //     return res.json()
  //   })
  //   .then((data)=>{
  //     setTimeout(()=>{
  //     b(data.blogs)
  //     setl(false)},2000)
  //     console.log(data.blogs[0])
  //   })
  //   console.log("ram")}, [])
//   return (

//    <div>
//   <New one={te} ff={ff}/>
//    </div>
    
  
//   )
// }
// export default App;

 

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
