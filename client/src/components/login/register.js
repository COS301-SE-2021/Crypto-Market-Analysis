import React, {Component} from "react";
import './css/register.css'
import login from "./login";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom'


class register extends Component{
    constructor() {
        super();
        this.state = {
            email:'',
            password:''
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
            returnSecureToken:'true'
        }

        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdKlvny3n-vFZia29DELhxGZWWRW2mt7s',registered)
            .then((res) =>{
                console.log("sign up successful");
                axios
                    .post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAdKlvny3n-vFZia29DELhxGZWWRW2mt7s',{requestType: "VERIFY_EMAIL", idToken: res.data.idToken})
                    .then((vres)=>{
                        console.log("verification email sent");
                        this.props.history.push('/login');
                    })
                    .catch((err) =>{
                        console.error(err);
                        //error handling for verification email not sent
                    })
            })
            .catch((err) =>{
                console.error(err);
                //Zeeshan Error Handling

                /*
                example response object
                 {
                      "error": {
                        "code": 400,
                        "message": "EMAIL_EXISTS",
                        "errors": [
                          {
                            "message": "EMAIL_EXISTS",
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
                            <h2>Register Account Form</h2>
                            <div className="form-row">
                                <label htmlFor="your-email">Your Email</label>
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
                                <input type="submit" name="register" className="register" value="Register"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
//export default register;
export default withRouter(register);

