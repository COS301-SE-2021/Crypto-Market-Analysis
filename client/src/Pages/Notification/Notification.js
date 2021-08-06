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
        console.log('you pressed delete!')
        let object = this.state.notificationObject;

        console.log("object before");
        console.log(object);
        console.log(object.hasOwnProperty(e.target.value))
        delete object[e.target.value];
        console.log(" after");
        console.log(object);
        console.log(object.hasOwnProperty(e.target.value))
        let  emailReq = {
            email: localStorage.getItem("emailSession"),
            object: object

        }

        axios.post('http://localhost:8080/user/setNotificationObject/',emailReq)
            .then(response => {
                  console.log(response);
            })
        this.setState({notificationObject: object});
        const objectdata= this.state.notificationObject;
        this.generateData(objectdata);

    }
    handleView= async (e)=> {
        console.log('you pressed view!')
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
                console.log(response);
            })

    }
    generateData(object_response){
        console.log('showing the response')
        this.setState({notificationObject: object_response});
        const objectOfNotificationdata= this.state.notificationObject;
        const notification_Array = [];
        console.log(Object.keys(objectOfNotificationdata).length)
        let i=0;
        for (const [key, value] of Object.entries(objectOfNotificationdata)) {
            i=i+1;
            console.log(value.Read)
            //console.log(`${key}: ${value.Email}`);
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
                console.log('i am here');
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
                console.log('setting state');
                this.setState({elem: notification_Array});
                console.log( this.state.elem);
            }
        }
    }
    componentDidMount(){
        let  emailReq = {
            email: localStorage.getItem("emailSession")
        }
       // this.setState({emailRequest: response.data});
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