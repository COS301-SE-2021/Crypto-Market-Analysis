import './App.css';
import {Route, Link} from "react-router-dom";
import login from "./components/login/login";
import register from "./components/login/register";
import splash from "./components/login/splash";
import Home from "./components/Home/Home";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <section className="header">
      <Route exact path="/" component={splash}></Route>
      <Route exact path="/register" component={register}></Route>
      <Route exact path="/login" component={login}></Route>
        <Route exact path="/home" component={Home}></Route>
        {/*<video autoPlay loop className="video-background" muted plays-inline>*/}
        {/*    <source src="/Splash/Splash.mp4" type="video/mp4"/>*/}
        {/*</video>*/}
        {/*<div className="welcome-message">*/}
        {/*    <h1>Welcome to Crypto</h1>*/}
        {/*    <h2>Crypto is the easiest place to track cryptocurrency.</h2>*/}
        {/*    <br/>*/}
        {/*        <br/>*/}
        {/*            <a href="#" className="btn btn-login">Login</a>*/}
        {/*            <a href="#" className="btn btn-register">Sign Up</a>*/}
        {/*</div>*/}
    </section>
  );
}

export default App;
