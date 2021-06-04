import React,{Component} from "react";
import './css/login.css'
import axios from 'axios';

class updatePassword extends Component{
    constructor()
    {
        super();
        this.state = {
            token:'',
            password:''
        }
        this.changeToken = this.changeToken.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeToken(event){
        this.setState({token:event.target.value})
    }
    changePassword(event){
        this.setState({password:event.target.value})
    }

    onSubmit(event)
    {
        event.preventDefault();
        const updatePassword = {
            token: this.state.token,
            email: this.state.password
        }

        axios
            .post('http://localhost:8080/user/updatePassword/',updatePassword)
            .then(() =>{window.location = '/home';} )
            .catch(err =>{
                console.error(err);

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
                            <div className="form-row">
                                <label htmlFor="your-token">Token</label>
                                <input type="your-token" name="your-token" id="your-token" className="input-text"
                                       placeholder="Your Token" required
                                       onChange={this.changeToken}
                                       value={this.state.token}
                                />
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
    }
}
export default updatePassword;











