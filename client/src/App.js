import './App.css';
import {Route, Link} from "react-router-dom";
import login from "./components/login/login";
import register from "./components/login/register";
import splash from "./components/login/splash";
import token from "./components/login/token"
import updatePassword from "./components/login/updatePassword";
import Home from "./components/Home/Home"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <section className="header">
      <Route exact path="/" component={splash}></Route>
      <Route exact path="/register" component={register}></Route>
      <Route exact path="/login" component={login}></Route>
      <Route exact path="/token" component={token}></Route>
      <Route exact path="/updatePassword" component={updatePassword}></Route>
      <Route exact path="/home" component={Home}></Route>
    </section>
  );
}

export default App;
