import React from "react";
import SweetAlert from 'react-bootstrap-sweetalert'
import {
    Alert,
    Card,
    Container,
    Row,
    Col,Toast
} from "react-bootstrap";
import axios from "axios";
class Push extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            elements: [ 
                <button  onClick={this.handleSubscribe}  type="button" className="btn-cryptosis text-blueGray-600 mr-0 ml-2 whitespace-nowrap text-sm uppercase font-bold px-0">
                    Subscribe</button>
            ]
        }
        this.handleSubscribe = this.handleSubscribe.bind(this);
        this.handleunSubscribe = this.handleunSubscribe.bind(this);
    }
    handleunSubscribe= async (e)=>{
        let  PushReq = {
            email: localStorage.getItem("emailSession"),
            object: {}
        }
        axios.post('/user/storePush/',PushReq)
            .then(response => {
                this.setState({alert: true});
                const notification_Arrays = [];
                notification_Arrays.push(
                    <button  onClick={this.handleSubscribe}  type="button" className="btn-cryptosis text-blueGray-600 mr-0 ml-2 whitespace-nowrap text-sm uppercase font-bold px-0">
                        Subscribe</button>
                );
                this.setState({elements: notification_Arrays});

            })
            .catch(err => {console.error(err);})
    }
    handleSubscribe= async (e)=> {
        let  PushReq = {
            email: localStorage.getItem("emailSession")
        }
        axios.post('/user/sendMail',PushReq)
            .then(response => {
                console.log(response);
            })
        axios.post('/user/GETPush/',PushReq)
            .then(response => {
                    const notification_Arrays = [];
                    notification_Arrays.push(
                        <button  onClick={this.handleunSubscribe}  type="button" className="btn-cryptosis text-blueGray-600 mr-0 ml-2 whitespace-nowrap text-sm uppercase font-bold px-0">
                            unSubscribe</button>
                   );
                    this.setState({elements: notification_Arrays});

            })
            .catch(err => {console.error(err);})
        const publicVapidKey =
            "BC0gVsYz3ljCKUO5KCfEcpaTFj3Ye_Q_q8vAWBTKDd_53jXsvtRMOYqTCUggv62UE3As_8psAJwXwTKTgXYUKNs";
        if ("serviceWorker" in navigator) {
            send().catch(err => console.error(err));
        }
        async function send() {
            // Register Service Worker
            console.log("Registering service worker...");
            //registerServiceWorker();
            const register = await navigator.serviceWorker.register("sw.js", {
                scope: "/"
            });
            console.log("Service Worker Registered...");

            console.log("Registering Push...");
            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });
            console.log("Push Registered...");

            // Send Push Notification
            console.log("Sending Push...");
            console.log(subscription)
            let  PushReq = {
                email: localStorage.getItem("emailSession"),
                object: subscription
            }
            axios.post('/user/subscribe/',PushReq)
                .then(response => {
                    console.log(response)

                })
                .catch(err => {console.error(err);})
            axios.post('/user/storePush/',PushReq)
                .then(response => {
                    console.log(response)

                })
                .catch(err => {console.error(err);})

            console.log("Push Sent...");
        }

            function urlBase64ToUint8Array(base64String) {
            const padding = "=".repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, "+")
                .replace(/_/g, "/");

            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }

    }
    componentDidMount(){
        let  PushReq = {
            email: localStorage.getItem("emailSession")
        }
        axios.post('/user/GETPush/',PushReq)
            .then(response => {
                if(Object.keys(response.data).length === 0)
                {
                    const notification_Arrays = [];
                    notification_Arrays.push(
                        <button  onClick={this.handleSubscribe}  type="button" className="btn-cryptosis text-blueGray-600 mr-0 ml-2 whitespace-nowrap text-sm uppercase font-bold px-0">
                            Subscribe</button>
                    );
                    this.setState({elements: notification_Arrays});
                }
                else {
                    const notification_Arrays = [];
                    notification_Arrays.push(
                        <button  onClick={this.handleunSubscribe}  type="button" className="btn-cryptosis text-blueGray-600 mr-0 ml-2 whitespace-nowrap text-sm uppercase font-bold px-0">
                            unSubscribe</button>
                   );
                    this.setState({elements: notification_Arrays});
                }

            })
            .catch(err => {console.error(err);})
    }
    render() {
        return (
            <React.Fragment>
                <div className="d-inline">
                         {this.state.elements}
                </div>
            </React.Fragment>
        );
    }
}

export default Push;