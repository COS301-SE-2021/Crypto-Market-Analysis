import './App.css';
import {Route, Link} from "react-router-dom"
import login from "./Pages/Login/login"
import Register from "./Pages/Register/register"
import splash from "./Pages/Splash/splash"
import token from "./Pages/Login/token"
import Settings from "./Pages/Settings/Settings";
import AllCrypto from "./Pages/AllCrypto/AllCrypto";
import UpdatePassword from "./Pages/UpdatePassword/updatePassword"
import UpdateProfile from "./Pages/UpdateProfile/updateProfile"
import Home from "./Pages/Home/Home"
import Profile from "./Pages/Profile/Profile"
import PrivateRoute from "./components/newRoute"
import Overview from "./components/Overview/Overview"
import HeaderStats from "./Pages/Home/Headers/HeaderStats"
import DetailedInfo from "./Pages/DetailedInfo/DetailedInfo"
import {BrowserRouter as router , Switch} from "react-router-dom";
import { AuthProvider } from "./Auth/Auth"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
      <router>
          <AuthProvider>
           <Switch>
                 <section className="header">
                     <Route exact path="/" component={splash}/>
                     <Route exact path="/register" component={Register}/>
                     <PrivateRoute exact path="/home" component={Home}/>
                     <Route exact path="/login" component={login}/>
                     <Route exact path="/updatePassword" component={UpdatePassword}/>
                     <Route exact path="/updateProfile" component={UpdateProfile}/>
                     <Route exact path="/Settings" component={Settings}/>
                     <Route exact path="/AllCrypto" component={AllCrypto}/>
                     <Route exact path="/Profile" component={Profile} />
                     <Route exact path="/HeaderStats" component={HeaderStats} />
                     <Route exact path="/DetailedInfo" component={DetailedInfo} />
                     <Route exact path="/Overview" component={Overview} />

                 </section>
           </Switch>
          </AuthProvider>
      </router>

  );
}

export default App;
