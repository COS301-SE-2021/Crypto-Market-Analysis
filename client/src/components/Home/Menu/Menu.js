import "bootstrap/dist/css/bootstrap.css";
import {AccountCircleRounded, ExitToApp} from "@material-ui/icons";
import "./Menu.css"
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../../Auth/Auth"
import { Link, useHistory } from "react-router-dom"
function Menu() {
    async function Logginout(){
        const [error, setError] = useState("")
        const { logout, currentUser } = useAuth()
        const history = useHistory()
        setError('')
      try{
          await logout()
          history.push("/login")
      }
      catch
      {
          setError("Failed to log out")
      }

    }
    return (
        <nav className="navbar bg-light justify-content-between">
        <a href="#" className="navbar-brand">Cryptosis</a>
        <ul className="navbar-nav">

            <li className="nav-item">
                <a href="/updateProfile"><AccountCircleRounded/></a>{/*Add a button for option when account is clicked*/}
            </li>
            <li className="nav-item">
                <a href="/login"><ExitToApp/></a>{/*Add a button for option when account is clicked*/}
            </li>
        </ul>
        </nav>
        );
}

export default Menu;