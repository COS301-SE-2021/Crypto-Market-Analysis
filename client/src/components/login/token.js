import React from "react";
import './css/login.css'
import axios from 'axios';
const token = () => {
    return (
        <div className="form-v5">
            <div className="page-content">
                <div className="form-v5-content">
                    <form className="form-detail" onSubmit={event => tokens(event)}>
                        <h2>Auth Token</h2>
                        <div className="form-row">
                            <label htmlFor="your-email">Email</label>
                            <input type="text" name="your-email" id="your-email" className="input-text"
                                   placeholder="Your Email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"/>
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="form-row">
                            <label htmlFor="your-token">Token</label>
                            <input type="your-token" name="your-token" id="your-token" className="input-text"
                                   placeholder="Your Token" required/>
                            <i className="fas fa-lock"></i>
                        </div>
                        <div className="form-row-last">
                            <input type="submit" name="token" className="register" value="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
//making a http post request to the endpoint containing form parameters
function tokens(event) {
    event.preventDefault();
    let request = {
        email: document.getElementById('your-email').value,
        token: document.getElementById('your-token').value
    };
    axios.post('http://localhost:8080/user/signup', request).then(resp=>{console.log("form sent");}).catch(err=>{console.log(err);})
}
export default token;
