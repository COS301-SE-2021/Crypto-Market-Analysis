import React, {Component} from "react";
import './css/login.css'
import axios from 'axios';
import Home from "../Home/Home";
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom'




class login extends Component{
    constructor() {
        super();
        this.state = {
            email:'',
            password:'',
            returnSecureToken:'true'
        }
        this.changePassword = this.changePassword.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeEmail(event){
        this.setState({email:event.target.value})
    }
    changePassword(event){
        this.setState({password:event.target.value})
    }

    onSubmit(event){
        event.preventDefault();
        const registered = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: "true"
        }

        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdKlvny3n-vFZia29DELhxGZWWRW2mt7s',registered)
            .then((res) =>{
                localStorage.setItem('idToken', JSON.stringify(res.data.idToken));
                localStorage.setItem('email', JSON.stringify(res.data.email));
                localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken));
                localStorage.setItem('expiresIn', JSON.stringify(res.data.expiresIn));
                localStorage.setItem('localId', JSON.stringify(res.data.localId));
                localStorage.setItem('registered', JSON.stringify(res.data.registered));
                console.log("signin successfull");
                this.props.history.push('/home');
            })
            .catch((err) =>{
                console.error(err);
                //Zeeshan error handling
                /*
                example response object
                    {
                      "error": {
                        "code": 400,
                        "message": "EMAIL_NOT_FOUND",
                        "errors": [
                          {
                            "message": "EMAIL_NOT_FOUND",
                            "domain": "global",
                            "reason": "invalid"
                          }
                        ]
                      }
                    }
                 */

            });
    }

    render() {
        return (
            <div className="form-v5">
                <div className="page-content">
                    <div className="form-v5-content">
                        <form className="form-detail" onSubmit={this.onSubmit}>
                            <h2>Login Form</h2>
                            <div className="form-row">
                                <label htmlFor="your-email" data-testid="label">Email</label>
                                <input type="text" name="your-email" id="your-email" className="input-text"
                                       placeholder="Your Email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                                       onChange={this.changeEmail}
                                       value={this.state.email}
                                />
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="form-row">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className="input-text"
                                       placeholder="Your Password" required
                                       onChange={this.changePassword}
                                       value={this.state.password}
                                />
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="form-row-last">
                                <input type="submit" name="register" className="register" value="Login"/>
                            </div>
                        </form>
                        <a href="/forgotpassword" className="btn btn-login">Forgot Password</a>
                    </div>
                </div>
            </div>
        );
    }
}
//export default login;
export default withRouter(login);


