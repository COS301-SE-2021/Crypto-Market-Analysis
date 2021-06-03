import React from "react";
import './css/splash.css';
import {Link} from "react-router-dom";

function splash(){
    return(
        <section className="header">
            <video autoPlay loop className="video-background" muted plays-inline>
                <source src={window.location.origin+'/Splash/splash2.mp4'} type="video/mp4"/>
            </video>
            <div className="welcome-message">
                <h1>Welcome to Cryptosis</h1>
                <h2>Cryptosis is the easiest place to track cryptocurrency.</h2>
                <br/>
                <br/>
                <a href="/login" className="btn btn-login">Login</a>
                <a href="/register" className="btn btn-register">Sign Up</a>
            </div>
        </section>
    );
}
export default splash;
