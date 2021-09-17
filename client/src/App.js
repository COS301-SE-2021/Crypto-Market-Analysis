import './App.css';
import {Route} from "react-router-dom"
import login from "./Pages/Login/login"
import Register from "./Pages/Register/register"
import Settings from "./Pages/Settings/Settings";
import AllCrypto from "./Pages/AllCrypto/AllCrypto";
import UpdatePassword from "./Pages/UpdatePassword/updatePassword"
import UpdateProfile from "./Pages/UpdateProfile/updateProfile"
import Home from "./Pages/Home/Home"
import Profile from "./Pages/Profile/Profile"
import Push from "./Pages/Push/Push"
import PrivateRoute from "./components/newRoute"
import Notification from "./Pages/Notification/Notification"
import DetailedInfo from "./Pages/DetailedInfo/DetailedInfo"
import Chat from "./Pages/Chatroom/chatroom"
import Comments from "./Pages/Comments/Comments"
import Posts from "./Pages/Posts/Posts"
import Subreddits from "./Pages/Subreddits/Subreddits"
//import Predictions from "./Pages/Predictions/Predictions"
import {BrowserRouter as Router , Switch} from "react-router-dom";
import { AuthProvider } from "./Auth/Auth"
import LandingPage from "./Pages/LandingPage/LandingPage"

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React,{ useEffect } from 'react';
import Predictions from "./Pages/Predictions/Predictions";

function App() {
    useEffect(async ()=>{
        window.twttr = await (function(d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        
            t._e = [];
            t.ready = function(f) {
            t._e.push(f)
            };
        
            return t;
        }(document, "script", "twitter-wjs"))
    },[])

  return (
          <AuthProvider>
           <Switch>
                 <section className="header">
                     {/*<Route exact path="/" component={Home}></Route>*/}
                     <Route exact path="/" component={LandingPage}></Route>
                     <Route exact path="/landing" component={LandingPage}></Route>
                     <Route exact path="/register" component={Register}></Route>
                     <Route exact path="/Push" component={Push}></Route>
                     <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
                     <Route exact path="/login" component={login}></Route>
                     <Route exact path="/updatePassword" component={UpdatePassword}></Route>
                     <Route exact path="/updateProfile" component={UpdateProfile}></Route>
                     <Route exact path="/Settings" component={Settings}></Route>
                     <Route exact path="/AllCrypto" component={AllCrypto}></Route>
                     <Route exact path="/Profile" component={Profile}></Route>
                     <Route exact path="/Notification" component={Notification}></Route>
                     <Route exact path="/home/DetailedInfo" component={DetailedInfo}></Route>
                     <Route exact path="/Subreddits" component={Subreddits}></Route>
                     <Route exact path="/Predictions" component={Predictions}></Route>
                     <Route exact path="/Chat" component={Chat}></Route>
                     <Route exact path="/Posts" component={Posts}></Route>
                     <Route exact path="/Comments" component={Comments}></Route>
                 </section>
           </Switch>
          </AuthProvider>
  );
}

export default App;
