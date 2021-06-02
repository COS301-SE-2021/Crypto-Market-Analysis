import React from "react";
import './css/login.css'

const login = () => {
    return (
        <div className="form-v5">
            <div className="page-content">
                <div className="form-v5-content">
                    <form className="form-detail" action="#" method="post">
                        <h2>Login Form</h2>
                        <div className="form-row">
                            <label htmlFor="your-email">Email</label>
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
                            <input type="submit" name="register" className="register" value="Login"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default login;
