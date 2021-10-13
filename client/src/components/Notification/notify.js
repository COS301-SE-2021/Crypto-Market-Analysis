import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {
    Alert,
    Card,
    Container,
    Row,
    Col,
} from "react-bootstrap";


class Notifications extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            elem: []
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        this.state = {
            elem: [<div>People</div>]
        }
        let  emailReq = {
            email: localStorage.getItem("emailSession")
        }
        axios.post('https://cryptosis-server.herokuapp.com/user/getNotificationObject/',emailReq)
            .then(response => {

                const objectOfNotificationdata= response.data;
                const notification_Array = [];
                let i=0;
                for (const [key, value] of Object.entries(objectOfNotificationdata)) {
                    i=i+1;
                    if(value.Read===true){
                        notification_Array.push( <Alert variant="info">
                            <Link  onClick={()=>this.handleView(key)} value={key}
                                   className={
                                       "text-xs uppercase py-3 font-bold block " +
                                       (window.location.href.indexOf("/DetailedInfo") !== -1
                                           ? "text-lightBlue-500 hover:text-lightBlue-600"
                                           : "text-blueGray-700 hover:text-blueGray-500")
                                   }
                                   to="/DetailedInfo"
                            >
                                <i className="far fa-bell"/>
                                <span>
                                        <p className="text-success"><h3>Cryptocurrency Notification</h3></p><p>{key}</p>

                                    {value.Email}
                                    <br></br>

                                                 <button  onClick={this.handleDelete} value={key} type="button" className="btn btn-outline-warning"><i className="fas fa-trash-alt"></i>Delete</button>
                    </span>
                            </Link>
                        </Alert>)
                    }
                    else if(value.Read===false){
                        notification_Array.push( <Alert variant="info">
                            <Link  onClick={()=>this.handleView(key)} value={key}
                                   className={
                                       "text-xs uppercase py-3 font-bold block " +
                                       (window.location.href.indexOf("/Profile") !== -1
                                           ? "text-lightBlue-500 hover:text-lightBlue-600"
                                           : "text-blueGray-700 hover:text-blueGray-500")
                                   }
                                   to="/Profile"
                            >
                                <i className="far fa-bell"></i>
                                <span>
                                        <p className="text-warning"><h3>Cryptocurrency Notification </h3></p><p>{key}</p>

                                    {value.Email}
                                    <br></br>

                                                 <button  onClick={this.handleDelete} value={key} type="button" className="btn btn-outline-warning"><i className="fas fa-trash-alt"></i>Delete</button>
                    </span>
                            </Link>
                        </Alert>)
                    }
                    if(i === Object.keys(objectOfNotificationdata).length){
                        this.state.elem.push(notification_Array);
                    }
                }
            })
            .catch(err => {console.error(err);})
    }

    render() {
        return (
            <div >
                <Container fluid>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">Notifications</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col class="col-md-6 offset-md-4">
                                    {this.state.elem}
                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default Notifications;