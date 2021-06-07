import React, {Component} from "react";
import './css/register.css'
import login from "./login";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom'


class register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        }
        this.changePassword = this.changePassword.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeEmail(event){
        const regex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
        if(regex.test(event.target.value)) {
            document.getElementById("your-email").classList.remove("is-invalid");
            document.getElementById("your-email").classList.add("is-valid");
        }
        else{
            document.getElementById("your-email").classList.remove("is-valid");
            document.getElementById("your-email").classList.add("is-invalid");
        }
    }
    changePassword(event){
        const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        if(regex.test(event.target.value)) {
            document.getElementById("password").classList.remove("is-invalid");
            document.getElementById("password").classList.add("is-valid");
        }
        else{
            document.getElementById("password").classList.remove("is-valid");
            document.getElementById("password").classList.add("is-invalid");
        }
    }

    onSubmit(event){
        event.preventDefault();
        if(document.getElementById("your-email").classList.contains("is-invalid")){
            document.getElementById("error-block").textContent = "Please enter a valid email address!";
            document.getElementById("error-block").style.display = "block";
        }
        else if(document.getElementById("password").classList.contains("is-invalid")){
            document.getElementById("error-block").textContent = "Please enter a valid password!";
            document.getElementById("error-block").style.display = "block";
        }
        else if (document.getElementsByClassName("is-invalid")) {
            document.getElementById("error-block").style.display = "none";
            this.state.password = document.getElementById("password").value
            this.state.email = document.getElementById("your-email").value
            const registered = {
                email: this.state.email,
                password: this.state.password,
                returnSecureToken:'true'
            }
            axios
                .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdKlvny3n-vFZia29DELhxGZWWRW2mt7s',registered)
                .then((res) =>{
                    axios
                        .post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAdKlvny3n-vFZia29DELhxGZWWRW2mt7s',{requestType: "VERIFY_EMAIL", idToken: res.data.idToken})
                        .then((vres)=>{
                            Window.setTimeout(3000);
                            document.getElementById("error-block").textContent = "Registration Successful. You will be redirected to the login page shortly";
                            document.getElementById("error-block").style.display = "block";
                            this.props.history.push('/login');
                        })
                        .catch((err) =>{
                            /*setTimeout(() => {
                                console.log("Enters timeout");
                            }, 3000)*/
                            document.getElementById("error-block").textContent = "Registration Successful. You will be redirected to the login page shortly";
                            document.getElementById("error-block").style.display = "block";
                            this.props.history.push('/login');
                            /*document.getElementById("error-block").textContent = "Failed to verify email address. Please check your details and try again";
                            document.getElementById("error-block").style.display = "block";*/
                        })
                })
                .catch((err) =>{
                    document.getElementById("error-block").textContent = "Email already exists!";
                    document.getElementById("error-block").style.display = "block";
                });
        }

    }


    render() {
        return (
            <div className="form-v5">
                <div className="page-content">
                    <div className="form-v5-content">
                        <form className="form-detail" onSubmit={this.onSubmit}>
                            <h2>Register Account Form</h2>
                            <div className="alert alert-danger" role="alert" id="error-block" style={{display:'none'}}/>
                            <div className="form-row">
                                <label htmlFor="your-email">Email</label>
                                <input type="text" name="your-email" id="your-email" className="form-control is-invalid"
                                       placeholder="Your Email" required
                                       onChange={this.changeEmail}
                                />
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="form-row mt-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className="form-control is-invalid"
                                       placeholder="Your Password" required
                                       onChange={this.changePassword}
                                       aria-describedby="passwordHelp"
                                />
                                <small id="passwordHelp" className="form-text text-muted mt-2">
                                    Password must contain at least:
                                    <li>8 characters</li>
                                    <li>1 uppercase character</li>
                                    <li>1 lowercase character</li>
                                    <li>1 number</li>
                                    <li>1 symbol</li>
                                </small>
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

