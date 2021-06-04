import React, {Component} from "react";
import './css/register.css'
import login from "./login";
import axios from "axios";

class register extends Component{
    constructor() {
        super();
        this.state = {
            email:'',
            username:'',
            password:''
        }
        this.changePassword = this.changePassword.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changeUsername = this.changeUsername.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeUsername(event){
        this.setState({username:event.target.value})
    }
    changeEmail(event){
        this.setState({email:event.target.value})
    }
    changePassword(event){
        this.setState({password:event.target.value})
    }

    onSubmit(event){
        // window.location = '/login'
        window.location = '/home'
        event.preventDefault();
        const registered = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }

        axios
            .post('http://localhost:8080/user/signup/',registered)
            .then(() =>{console.log('sent');
                window.location = '/home';}
            )
            .catch(err =>{
                console.error(err);
                // window.location = '/home'
            });

        // window.location = '/home'
    }

    render() {
        return (
            <div className="form-v5">
                <div className="page-content">
                    <div className="form-v5-content">
                        <form className="form-detail" onSubmit={this.onSubmit}>
                            <h2>Register Account Form</h2>
                            <div className="form-row">
                                <label htmlFor="full-name">Username</label>
                                <input type="text" name="full-name" id="full-name" className="input-text"
                                       placeholder="Your Username" onChange={this.changeUsername}
                                                                    value={this.state.username}
                                       required/>
                                <i className="fas fa-user"></i>
                            </div>
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
export default register;
