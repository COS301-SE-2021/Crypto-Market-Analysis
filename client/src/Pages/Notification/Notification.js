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
import Push from "../Push/Push";
class Notifications extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            elem: [],
            notificationObject:{},
            emailRequest:{}
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete= async (e)=> {
        let object = this.state.notificationObject;


        delete object[e.target.value];

        let  emailReq = {
            email: localStorage.getItem("emailSession"),
            object: object

        }

        axios.post('http://localhost:8080/user/setNotificationObject/',emailReq)
            .then(response => {
            })
        this.setState({notificationObject: object});
        const objectdata= this.state.notificationObject;
        this.generateData(objectdata);

    }
    handleView= async (e)=> {
        let viewObject = this.state.notificationObject;
        if(viewObject[e].Read!=='undefined'){
            viewObject[e].Read =true;
        }
        let  ObjectReq = {
            email: localStorage.getItem("emailSession"),
            object: viewObject

        }

        axios.post('http://localhost:8080/user/setNotificationObject/',ObjectReq)
            .then(response => {
            })

    }
    generateData(object_response){
        this.setState({notificationObject: object_response});
        const objectOfNotificationdata= this.state.notificationObject;
        const notification_Array = [];
        let i=0;
        for (const [key, value] of Object.entries(objectOfNotificationdata)) {
            i=i+1;
            if(value.Read===true){
                notification_Array.push( <Alert variant="info">
                    <i className="far fa-bell"></i>
                    <span>
                                        <Link  onClick={()=>this.handleView(key)} value={key}
                                                                            className={
                                                                                "text-xs uppercase py-3 font-bold block " +
                                                                                (window.location.href.indexOf("/DetailedInfo") !== -1
                                                                                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                                                                                    : "text-blueGray-700 hover:text-blueGray-500")
                                                                            }
                                                                            to="/DetailedInfo"
                                        > <p className="text-success"><h3>Cryptocurrency Notification</h3></p></Link><p>{key}</p>

                        {value.Email}
                        <br></br>

                                                 <button  onClick={this.handleDelete} value={key} type="button" className="btn btn-outline-warning"><i className="fas fa-trash-alt"></i>Delete</button>
                    </span>
                </Alert>)
            }
            else if(value.Read===false){
                notification_Array.push( <Alert variant="info">
                    <i className="far fa-bell"></i>
                    <span>
                                         <Link  onClick={()=>this.handleView(key)} value={key}
                                                className={
                                                    "text-xs uppercase py-3 font-bold block " +
                                                    (window.location.href.indexOf("/DetailedInfo") !== -1
                                                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                                                        : "text-blueGray-700 hover:text-blueGray-500")
                                                }
                                                to="/DetailedInfo"
                                         ><p className="text-warning"><h3>Cryptocurrency Notification </h3></p></Link><p>{key}</p>

                        {value.Email}
                        <br></br>

                                                 <button  onClick={this.handleDelete} value={key} type="button" className="btn btn-outline-warning"><i className="fas fa-trash-alt"></i>Delete</button>
                    </span>
                </Alert>)
            }
            if(i=== Object.keys(objectOfNotificationdata).length){
                this.setState({elem: notification_Array});
            }
        }
    }
    componentDidMount(){
        let  emailReq = {
            email: localStorage.getItem("emailSession")
        }

        axios.post('http://localhost:8080/user/getNotificationObject/',emailReq)
            .then(response => {
                this.generateData(response.data)

            })
            .catch(err => {console.error(err);})
      }

    render() {
        return (
            <><Sidebar />
            <div className="md:ml-64">

                <Container fluid>

                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">Notifications</Card.Title>
                            <Push/>
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
            </>
        );
    }
}

export default Notifications;