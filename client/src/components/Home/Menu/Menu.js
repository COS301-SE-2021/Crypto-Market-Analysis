import "bootstrap/dist/css/bootstrap.css";
import {AccountCircleRounded, ExitToApp} from "@material-ui/icons";
import "./Menu.css"
import React from "react";
function Menu() {
    return (
        <nav className="navbar bg-light justify-content-between">
        <a href="#" className="navbar-brand">Cryptosis</a>
        <ul className="navbar-nav">

            <li className="nav-item">
                <a href="/register"><AccountCircleRounded/></a>{/*Add a button for option when account is clicked*/}
            </li>
            <li className="nav-item">
                <a href="/splash"><ExitToApp/></a>{/*Add a button for option when account is clicked*/}
            </li>
        </ul>
            <a href="/updatePassword" className="btn btn-login">Update Password</a>
            <a href="/" className="btn btn-login">Logout</a>

        </nav>
        );
}

export default Menu;