import React,{Component} from "react";
import './css/login.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import register from "./register";


class updatePassword extends Component{
    constructor()
    {
        super();
        this.state = {
            idToken: localStorage.getItem('idToken'),
            password:'',
            returnSecureToken: 'true'
        }
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    changePassword(event){
        this.setState({password:event.target.value})
    }
    onSubmit(event)
    {
        event.preventDefault();
        const updatePassword = {
            password: this.state.password
        }
        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAdKlvny3n-vFZia29DELhxGZWWRW2mt7s',updatePassword)
            .then(() =>{console.log("password updated");
                this.props.history.push('/home');

            } )
            .catch(err =>{
                console.error(err);
                //error handling check error object
            });
    }
    render()
    {
        return (
            <div className="form-v5">
                <div className="page-content">
                    <div className="form-v5-content">
                        <form className="form-detail" onSubmit={this.onSubmit}>
                            <h2>Update Password</h2>
                            <div className="form-row">
                                <label htmlFor="your-email">New Password</label>
                                <input type="text" name="your-email" id="your-email" className="input-text"
                                       placeholder="Your Email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                                       onChange={this.changePassword}
                                       value={this.state.password}
                                />
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="form-row-last">
                                <input type="submit" name="token" className="register" value="Submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(updatePassword);
//export default updatePassword;











