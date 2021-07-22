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
import HeaderStats from "./Pages/Home/Headers/HeaderStats"
import {BrowserRouter as router , Switch} from "react-router-dom";
import { AuthProvider } from "./Auth/Auth"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
      <router>
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
                     <Route exact path="/HeaderStats" component={HeaderStats}></Route>
                 </section>
           </Switch>
          </AuthProvider>
      </router>

  );
}

export default App;
