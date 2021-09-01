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
import './Note.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import Push from "../Push/Push";
import Checkbox from '@material-ui/core/Checkbox';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const filterOptions = ['Read', 'Unread', 'Today']
class Notifications extends React.Component {

    

    constructor(props) {
        super(props)
        this.state = {
            elem: [],
            notificationObject:{},
            emailRequest:{},
            clear: false,
            _delete: false,
             unread:0

        }
       
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteALL = this.handleDeleteALL.bind(this);
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
        this.setState({_delete: true});
        this.setState({notificationObject: object});
        const objectdata= this.state.notificationObject;
        this.generateData(objectdata);

    }
    handleDeleteALL= async (e)=> {
        let object = {};



        let  emailReq = {
            email: localStorage.getItem("emailSession"),
            object: object

        }

        axios.post('http://localhost:8080/user/setNotificationObject/',emailReq)
            .then(response => {
            })
        this.setState({clear: true});
        this.setState({notificationObject: object});
        const objectdata= {};
        this.setState({elem: []});
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
        console.log(Object.keys(object_response).length);

        let ppo = 0;
        let counter = 0;
        for (const [key, value] of Object.entries(object_response)) {
            ppo=ppo+1;
            if(value.Read===false && value.Read!=='undefined')
            {
                counter= counter+1;
            }
            if(ppo === Object.entries(object_response).length){
                this.setState({unread: counter});
            }
        }
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
                                                                                (window.location.href.indexOf("/home") !== -1
                                                                                    ? "text-lightBlue-500 hover:text-Red-600"
                                                                                    : "text-blueGray-700 hover:text-Green-500")
                                                                            }
                                                                            to="/home"
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
                                                    (window.location.href.indexOf("/home") !== -1
                                                        ? "text-Blue-500 hover:text-Red-600"
                                                        : "text-Gray-700 hover:text-Red-500")
                                                }
                                                to="/home"
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
            <>
                <SweetAlert show={this.state.clear} success title={"Successfully cleared all notifications"} onConfirm={()=>{
                    this.setState({clear: false});
                }}></SweetAlert>

                <SweetAlert show={this.state._delete} success title={"Successfully deleted a message"} onConfirm={()=>{
                    this.setState({_delete: false});
                }}></SweetAlert>
                <Sidebar unread={this.state.unread}/>

            <div className="md:ml-64">

                <Container className="mt-3" fluid>

                    <Card  >
                        <Card.Header >
                           {/* <Card.Title as="h4" class="card text-center">NOTIFICATIONS</Card.Title> */}
                           
                            <Push className="btn btn-cryptosis"/>
                            <button  onClick={this.handleDeleteALL} type="button" className="btn-cryptosis text-blueGray-600 mr-0 mt-1 ml-2 text-sm uppercase font-bold px-0 float-right"><i className="fas fa-trash-alt"></i>&nbsp;Clear all Notifications</button>
                            
                        </Card.Header>
                        <Card.Body style={{height:"50%"}} >
                            {/* <Row>
                                <Col class="col-md-6 offset-md-4" className="card border-primary mb-3">
                                    {this.state.elem}
                                    {console.log(this.state.elem)}
                                </Col>
                            </Row> */}
                             {console.log("nazoo")}
                             {console.log(this.state.elem)}
                                <Row>
                                    <div className="col-md-4" style={{borderRight:"1px solid #c1c1c1"}}>
                                        <p className="text-blueGray-600 mr-0 mt-1 ml-2 text-sm uppercase font-bold px-0">Filter &amp; refine</p>
                                            {
                                                filterOptions.map(element => {
                                                    return( <div>
                                                            <Checkbox style={{ color: "#03989e", marginRight: 0 }} /> 
                                                            {element}
                                                            
                                                            </div>
                                                           
                                                        )
                                                })
                                            }
                                          <DayPickerInput onDayChange={this.handleDayChange} />  
                                            
                                        
                                    </div>
                                    <div className="col-md-8">
                                    <div className="row grid-15-gutter">
                                    <div className="col-md-6">
                                        <div className="card panel">
                                            <div className="toast-header">
                                                <strong className="mr-auto">Bitcoin</strong>
                                                <small>friday 12.00.00</small>
                                                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="media-body">
                                                Bitcoin average sentiment did not change!
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card panel">
                                            <div className="toast-header">
                                                <strong className="mr-auto">Bitcoin</strong>
                                                <small>Time</small>
                                                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="media-body">
                                                Bitcoin average sentiment did not change!
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card panel">
                                            <div className="toast-header">
                                                <strong className="mr-auto">Bitcoin</strong>
                                                <small>Time</small>
                                                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="media-body">
                                                Bitcoin average sentiment did not change!
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                    </div>
                                </Row>     
                        </Card.Body>
                    </Card>
                </Container>
            </div>
                {/*<div>*/}
                {/*    <Sidebar unread={this.state.unread}/>*/}
                {/*    <div className="md:ml-64">*/}
                {/*           <Card >*/}
                {/*                        <Card.Header >*/}
                {/*                           <Card.Title as="h3" class="card text-center">NOTIFICATIONS</Card.Title>*/}
                {/*                        </Card.Header>*/}
                {/*                   <Card.Body>*/}

                {/*                   </Card.Body>*/}
                {/*            </Card>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </>
        );
    }
}

export default Notifications;