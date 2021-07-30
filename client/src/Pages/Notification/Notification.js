import React, {useEffect, useState} from "react";
import NotificationAlert from "react-notification-alert";
import {
    Alert,
    Card,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import db from "../../firebase";

function Notifications() {
    let[Notification_object,setNotification] =useState([]);
    let[elem,setElem] =useState([]);
    const notificationAlertRef = React.useRef(null);
   const handleDelete= async (e)=> {
        e.preventDefault();
        await db.firestore().collection('Users').doc(localStorage.getItem("emailSession")).get().then((notify)=> {
            // console.log(notify.data().notification.Email);
            let i = 0;
            let object = notify.data().notification;


            delete object[e.target.value];
            const notification_object ={
                notification:object
            }
            db.firestore().collection('Users').doc(localStorage.getItem("emailSession")).set(notification_object, {merge:true});
        })
    }
    useEffect(async () => {
        let notification_Array = [];
        await db.firestore().collection('Users').doc(localStorage.getItem("emailSession")).get().then((notify)=>{
                 // console.log(notify.data().notification.Email);
            let i = 0;
            for (const [key, value] of Object.entries(notify.data().notification)) {
                i=i+1;
                //console.log(`${key}: ${value.Email}`);
                notification_Array.push( <Alert variant="info">
                    <i className="far fa-bell"></i>
                    <span>
                                        <p className="text-success"><h3>Cryptocurrency Notification {Notification_object.Email}</h3></p><p>{key}</p>

                                          {value.Email}
                        <br></br>
                                                 <button  onClick={handleDelete} value={key} type="button" className="btn btn-outline-warning"><i className="fas fa-trash-alt"></i>Delete</button>
                                    </span>

                </Alert>)
                if(i === Object.entries(notify.data().notification).length){
                    setElem(notification_Array);
                }
            }

        })
    });
    return (
        <>
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
                                {elem}
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Notifications;