import React, {Component} from "react";
import './css/register.css'
import login from "./login";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom'


class forgotpassword extends Component{
    constructor() {
        super();
        this.state = {
            email:''
        }
        this.changeEmail = this.changeEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeEmail(event){
        this.setState({email:event.target.value})
    }
    onSubmit(event){
        event.preventDefault();
        const registered = {
            requestType: "PASSWORD_RESET",
            email: this.state.email
        }

        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAdKlvny3n-vFZia29DELhxGZWWRW2mt7s',registered)
            .then((res) =>{
                console.log("reset_email_sent");
                this.props.history.push('/login');
            })
            .catch((err) =>{
                console.error(err);
                //Zeeshan Error Handling
            });
    }


    render() {
        return (
            <div className="form-v5">
                <div className="page-content">
                    <div className="form-v5-content">
                        <form className="form-detail" onSubmit={this.onSubmit}>
                            <h2>Reset Password Form</h2>
                            <div className="form-row">
                                <label htmlFor="your-email">Your Email</label>
                                <input type="text" name="your-email" id="your-email" className="input-text"
                                       placeholder="Your Email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                                       onChange={this.changeEmail}
                                       value={this.state.email}
                                />
                                <i className="fas fa-envelope"></i>
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
export default withRouter(forgotpassword);

