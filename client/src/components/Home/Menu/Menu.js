import "bootstrap/dist/css/bootstrap.css";
import {AccountCircleRounded, ExitToApp} from "@material-ui/icons";
import "./Menu.css"
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
        </nav>
        );
}

export default Menu;