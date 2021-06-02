import React from "react";
import './css/register.css'
import login from "./login";
import axios from "axios";
const register = () => {
    return (
        <div className="form-v5">
            <div className="page-content">
                <div className="form-v5-content">
                    <form className="form-detail" onSubmit={event => registers(event)}>
                        <h2>Register Account Form</h2>
                        <div className="form-row">
                            <label htmlFor="full-name">Username</label>
                            <input type="text" name="full-name" id="full-name" className="input-text"
                                   placeholder="Your Username" required/>
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="form-row">
                            <label htmlFor="your-email">Your Email</label>
                            <input type="text" name="your-email" id="your-email" className="input-text"
                                   placeholder="Your Email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"/>
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="form-row">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className="input-text"
                                   placeholder="Your Password" required/>
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
};
//making a http post request to the endpoint containing form parameters
function registers(event) {
    event.preventDefault();
    let request = {
        username: document.getElementById('full-name'),
        email: document.getElementById('your-email'),
        password: document.getElementById('password')
    };
    axios.post('http://localhost:8080/user/signup', request).then(resp=>{console.log("form sent");}).catch(err=>{console.log(err);})
}

export default register;
