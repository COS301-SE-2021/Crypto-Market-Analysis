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
import SweetAlert from 'sweetalert-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

const filterOptions = ['Read', 'Unread', 'Newest', 'Latest']
class Notifications extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            elem: [],
            notificationObject:{},
            emailRequest:{},
            clear: false,
            _delete: false,
             unread:0,
            read_checked: false,
            unread_checked: false,
            newest_checked: false,
            latest_checked: false,
            notificationsList:[]
        }
        this.dateFrom = Date.now();
        this.dateTo = Date.now();
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteALL = this.handleDeleteALL.bind(this);
    }

    handleSelect = (e) =>{
       
        if(e.target.value === "Read"){
            let filter_read = []
            this.setState({read_checked:!this.state.read_checked})
            if(this.state.read_checked){
                
                this.state.notificationsList.forEach(element => {
                    if(element.read)
                    {
                        filter_read.push(element)
                    }
                });
            }

            console.log(filter_read)
        }
        else if(e.target.value === "Unread"){
            this.state.unread_checked = !this.state.unread_checked
           
          }
        else if(e.target.value === "Newest"){
            this.state.newest_checked = !this.state.newest_checked

        }
        else if(e.target.value === "Latest"){
            this.state.latest_checked = !this.state.latest_checked
            
        }
    }
    handleDelete= async (e)=> {
        let object = this.state.notificationObject;


        delete object[e.target.value];

        let  emailReq = {
            email: localStorage.getItem("emailSession"),
            object: object

        }

        axios.post('/user/setNotificationObject/',emailReq)
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

        axios.post('/user/setNotificationObject/',emailReq)
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

        axios.post('/user/setNotificationObject/',ObjectReq)
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
                let notifObj = {'content':value.Email,'time':key,'read':value.Read}
                this.state.notificationsList.push(notifObj)
                console.log("DONE")
               
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

        axios.post('/user/getNotificationObject/',emailReq)
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
                             {console.log("notifications")}
                             {console.log(this.state.elem)}
                             {console.log(this.state.notificationsList)}
                                <Row>
                                    <div className="col-md-4" style={{borderRight:"1px solid #c1c1c1"}}>
                                        <p className="text-blueGray-600 mr-0 mt-1 ml-2 text-sm uppercase font-bold px-0">Filter &amp; refine</p>
                                            {
                                                filterOptions.map(element => {
                                                    return( <div>
                                                            <Checkbox value={element} onChange={this.handleSelect} style={{ color: "#03989e", marginRight: 0 }} />
                                                            {element}
                                                            
                                                            </div>
                                                           
                                                        )
                                                })
                                            }

                                            <p>From</p>
                                            <DayPickerInput style={{width:"30%"}} onDayChange={this.handleDayChange} /> 

                                            <p>To</p>
                                            <DayPickerInput style={{width:"30%"}} onDayChange={this.handleDayChange} />
                                            
                                        
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row grid-15-gutter">
                                            {
                                                this.state.notificationsList.map(obj=>{
                                                    
                                                    return(
                                                        <div className="col-md-6">
                                                            <div className="card panel">
                                                                <div className="toast-header">
                                                                    <strong className="mr-auto">Bitcoin</strong>
                                                                    <small>{moment(obj.time).format('DD/MM/YYYY HH:mm')}</small>
                                                                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="media-body">
                                                                    {obj.content}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
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
