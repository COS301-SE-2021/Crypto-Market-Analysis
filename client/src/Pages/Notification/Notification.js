import React, {useEffect} from "react";
import NotificationAlert from "react-notification-alert";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import {
    Alert,
    Card,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import db from "../../firebase";

function Notifications() {
    const notificationAlertRef = React.useRef(null);
    function handleDelete(e) {
        e.preventDefault();
        console.log('You clicked submit.');
    }
    useEffect(async () => {
        await db.firestore().collection('Users').doc(localStorage.getItem("emailSession")).get().then((data)=>{
            for(const social of data.data().notification) {
                  console.log(social);
            }

        })
    });
    return (
        <>
            <Sidebar/>
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Container fluid>
                <Card>
                    <Card.Header>
                        <Card.Title as="h4">Notifications</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Row>

                            <Col class="col-md-6 offset-md-4">
                                <Alert variant="info">
                                    <i className="far fa-bell"></i>
                                    <span>
                                        <p className="text-success"><h3>Cryptocurrency Notification</h3></p><p>Tue Jul 27 2021 18:36:33</p>

                                        Bitcoin average sentiment did not change!
                                         <br></br>
                                                 <button  onClick={handleDelete} type="button" className="btn btn-outline-warning"><i className="fas fa-trash-alt"></i>Delete</button>
                                    </span>
                                </Alert>
                            </Col>

                        </Row>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Notifications;
