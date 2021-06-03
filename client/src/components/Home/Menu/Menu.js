import "bootstrap/dist/css/bootstrap.css";
import {AccountCircleRounded} from "@material-ui/icons";
import "./Menu.css"
function Menu() {
    return (
        <nav className="navbar bg-light justify-content-between">
        <a href="#" className="navbar-brand">AppName</a>
        <ul className="navbar-nav">
            <li className="nav-item">
                <AccountCircleRounded/>{/*Add a button for option when account is clicked*/}
            </li>
        </ul>
        </nav>
        );
}

export default Menu;