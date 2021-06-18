import './App.css';
import {Route, Link} from "react-router-dom"
import login from "./components/login/login"
import Register from "./components/login/register"
import splash from "./components/login/splash"
import token from "./components/login/token"
import QuickView from "./components/Home/QuickView/QuickView";
import HeadStats from "./components/Home/Headers/HeaderStats";
import UpdatePassword from "./components/login/updatePassword"
import UpdateProfile from "./components/login/updateProfile"
import Home from "./components/Home/Home"
import PrivateRoute from "./components/newRoute"
import {BrowserRouter as router , Switch} from "react-router-dom";
import { AuthProvider } from "./Auth/Auth"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
      <router>
          <AuthProvider>
           <Switch>
                 <section className="header">
                     <Route exact path="/" component={splash}></Route>
                     <Route exact path="/register" component={Register}></Route>
                     <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
                     <Route exact path="/login" component={login}></Route>
                     <Route exact path="/updatePassword" component={UpdatePassword}></Route>
                     <Route exact path="/updateProfile" component={UpdateProfile}></Route>
                     <Route exact path="/QuickView" component={QuickView}></Route>
                 </section>
           </Switch>
          </AuthProvider>

      </router>

  );
}

export default App;
