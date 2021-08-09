import React from "react";
import {
    Alert,
    Card,
    Container,
    Row,
    Col,Toast
} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import {db} from "../../firebase"
class Push extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            elem: [],
            notificationObject:{},
            emailRequest:{}
        }
    }
    componentDidMount(){
        const publicVapidKey =
            "BC0gVsYz3ljCKUO5KCfEcpaTFj3Ye_Q_q8vAWBTKDd_53jXsvtRMOYqTCUggv62UE3As_8psAJwXwTKTgXYUKNs";

// Check for service worker
        if ("serviceWorker" in navigator) {
            send().catch(err => console.error(err));
        }

// Register SW, Register Push, Send Push
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
            await fetch("http://localhost:8080/user/subscribe/", {
                method: "POST",
                body: JSON.stringify(subscription),
                headers: {
                    "content-type": "application/json"
                }
            });
            let  emailReq = {
                subscription
            }
            axios.post('http://localhost:8080/user/subscribe/',emailReq)
                .then(response => {
                  console.log(response);

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

    render() {
        return (
            <><Sidebar />
                <div className="md:ml-64">

                    <Container fluid>

                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Notifications</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col class="col-md-6 offset-md-4">
                                        Push
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </>
        );
    }
}

export default Push;