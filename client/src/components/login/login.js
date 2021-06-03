import React, {Component} from "react";
import './css/login.css'
import axios from 'axios';


class login extends Component{
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
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        axios
            .post('http://localhost:8080/user/login/',data)
            .then(() => console.log('sent'))
            .catch(err =>{
                console.error(err);
                window.location = '/login'
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
                                <label htmlFor="your-email">Email</label>
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
                    </div>
                </div>
            </div>
        );
    }
}
export default login;


