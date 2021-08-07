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
import PrivateRoute from "./components/newRoute"
import Notification from "./Pages/Notification/Notification"
import DetailedInfo from "./Pages/DetailedInfo/DetailedInfo"
import Subreddits from "./Pages/Subreddits/Subreddits"
import {BrowserRouter as Router , Switch} from "react-router-dom";
import { AuthProvider } from "./Auth/Auth"

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react';
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
      <Router>
          <AuthProvider>
           <Switch>
                 <section className="header">
                     <Route exact path="/" component={Home}></Route>
                     <Route exact path="/register" component={Register}></Route>
                     <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
                     <Route exact path="/login" component={login}></Route>
                     <Route exact path="/updatePassword" component={UpdatePassword}></Route>
                     <Route exact path="/updateProfile" component={UpdateProfile}></Route>
                     <Route exact path="/Settings" component={Settings}></Route>
                     <Route exact path="/AllCrypto" component={AllCrypto}></Route>
                     <Route exact path="/Profile" component={Profile}></Route>
                     <Route exact path="/Notifications" component={Notification}></Route>
                     <Route exact path="/home/DetailedInfo" component={DetailedInfo}></Route>
                     <Route exact path="/Subreddits" component={Subreddits}></Route>
                 </section>
           </Switch>
          </AuthProvider>
      </Router>

  );
}

export default App;
