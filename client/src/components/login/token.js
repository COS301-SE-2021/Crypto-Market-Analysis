import React,{Component} from "react";
import './css/login.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom'


class token extends Component{
    constructor() {
        super();
        this.state = {
            token:''
        }
        this.changeToken = this.changeToken.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeToken(event){
        this.setState({token:event.target.value})
    }
    onSubmit(event){
        event.preventDefault();
        const token = {
            oobCode: this.state.token,
        }

        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAdKlvny3n-vFZia29DELhxGZWWRW2mt7s',token)
            .then(() =>{console.log("token entered")} )
            .catch(err =>{
                console.error(err);
                //handle error for incorrect token
            });
    }
    render() {
        return (
            <div className="form-v5">
            <div className="page-content">
                <div className="form-v5-content">
                    <form className="form-detail" onSubmit={this.onSubmit}>
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
        </div>);
    }
}
// export default token;
export default withRouter(token);



