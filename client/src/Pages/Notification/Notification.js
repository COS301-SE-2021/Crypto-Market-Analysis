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
import swal from 'sweetalert';
import Hyperlink from 'react-native-hyperlink';
import { Text } from "react-native";
import { Markup } from 'react-render-markup';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

const filterOptions = ['Read', 'Unread', 'Latest', 'Oldest']

let filtered = []
class Notifications extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            elem: [],
            notificationObject:{},
            emailRequest:{},
            clear: false,
            _delete: false,
            refresh: false,
             unread:0,
            read_checked: false,
            unread_checked: false,
            newest_checked: false,
            oldest_checked: false,
            og_list : [],
            list:[],
            temp_list:[],
            ids:[]
        }
        // this.state.list = this.state.og_list;
        this.dateFrom = Date.now();
        this.dateTo = Date.now();
        this.handleLatestCheck = this.handleLatestCheck.bind(this)
        this.handleOldestCheck = this.handleOldestCheck.bind(this)
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleDeleteALL = this.handleDeleteALL.bind(this);
        this.generateID = this.generateID.bind(this);
    }
   
    handleSelect = (e) =>{
       
        if(e.target.value === "Read"){
         
    
            this.state.read_checked = !this.state.read_checked
            let filtered = []
            if(this.state.read_checked){
               
                filtered = this.state.og_list.filter(element=>{
                    return element.read 
                })
               
                if(this.state.temp_list.length > 0){

                  
                    filtered.push(...this.state.temp_list)
                    this.setState({list:filtered}) //add to the list not replace
                    
                }
                else{
                    this.setState({list:filtered,temp_list:filtered})
                }
            }
            else{
              
                filtered = this.state.list.filter(element=>{
                    return !element.read 
                })
              
                if(filtered.length > 1){
                    this.setState({list:filtered,temp_list:filtered})
                }
                else{
                    this.setState({list:this.state.og_list,temp_list:[]})
                }
            }
            
        }
        else if(e.target.value === "Unread"){
            this.state.unread_checked = !this.state.unread_checked
            let filtered = []
            if(this.state.unread_checked){
               
                filtered = this.state.og_list.filter(element=>{
                    return !element.read 
                })
                if(this.state.temp_list.length > 0){
                    filtered.push(...this.state.temp_list)
                    this.setState({list:filtered})
                }
                else{
                    this.setState({list:filtered,temp_list:filtered})
                }
            }
            else{
                filtered = this.state.list.filter(element=>{
                    return element.read 
                })
                if(filtered.length > 1){
                    this.setState({list:filtered,temp_list:filtered})
                }
                else{
                    this.setState({list:this.state.og_list,temp_list:[]})
                }

            }
           
          }
        else if(e.target.value === "Latest"){
            this.state.newest_checked = !this.state.newest_checked
            this.handleLatestCheck()

        }
        else if(e.target.value === "Oldest"){
            this.state.oldest_checked = !this.state.oldest_checked
            this.handleOldestCheck()
        }
        
    }
    handleLatestCheck = () =>{
       
            if(this.state.newest_checked){
                
                this.setState({list: this.state.list.sort((a,b)=>{
                    return new Date(moment(b.time).toDate()).getTime() - new Date(moment(a.time).toDate()).getTime() 
                    })
                })
            }
    }
    handleOldestCheck = () =>{
        
        if(this.state.oldest_checked){
            this.setState({list: this.state.list.sort((a,b)=>{
                return new Date(moment(a.time).toDate()).getTime() - new Date(moment(b.time).toDate()).getTime() 
                })
            })
        }
    }
    handleDelete = (e)=> {
       
        let object = this.state.notificationObject;
      
        delete object[e];

        let  emailReq = {
            email: localStorage.getItem("emailSession"),
            object: object
        }
        
        axios.post('https://cryptosis-server.herokuapp.com/user/setNotificationObject/',emailReq)
            .then(() => {
              
                this.setState({refresh: !this.state.refresh});
                this.setState({notificationObject: object});
                const objectdata= this.state.notificationObject;
                this.generateData(objectdata);
                // this.setState({list: object});
            })
        
        

    }
    handleDeleteALL= async (e)=> {
        let object = {};



        let  emailReq = {
            email: localStorage.getItem("emailSession"),
            object: object

        }

        axios.post('https://cryptosis-server.herokuapp.com/user/setNotificationObject/',emailReq)
            .then(() => {
                swal("Successfully cleared all notifications", {
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                  });
            })
        // this.setState({clear: true});
        this.setState({notificationObject: object});
        const objectdata= {};
        this.setState({elem: []});
        this.generateData(objectdata);
        window.location.reload(true);
    }
 
    generateID=  (email, crypto_name)=>{
     
        let array = []
        let coin_ids = []
        let  requestObj = { email: localStorage.getItem("emailSession") }
         axios.post('https://cryptosis-server.herokuapp.com/user/getUserCryptos/', requestObj)
        .then(async(response) => {
            
            for(const crypto of response.data)
            array.push(crypto);

            axios.post('https://cryptosis-server.herokuapp.com/user/getCoinIDs/', requestObj)
            .then(async(response) => {
            
                coin_ids = response.data
                let index=0;
               
                for (let crypto of array)
                {
                    crypto_name.toLowerCase();
                    crypto.toLowerCase();
                   
                    if(crypto === crypto_name)
                    { 
                      
                        return coin_ids[index];
                    }
                }
            }).catch(err => {
                console.error(err)
            })
           
         
        }).catch(err => {
            console.error(err)
        })

          
       
        
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
        
        axios.post('https://cryptosis-server.herokuapp.com/user/setNotificationObject/',ObjectReq)
            .then(response => {
            })

    }

    generateData(object_response){
        let ppo = 0;
        let counter = 0;
        let unreadNum = 0;
        this.setState({og_list:[]})
        for (const [key, value] of Object.entries(object_response)) {
            ppo=ppo+1;
            if(value.Read!=='undefined')
            {
                counter= counter+1; 
                let notifObj = {'content':value.Email,'time':key,'read':value.Read}
                this.state.og_list.push(notifObj)
                // this.state.list.push(notifObj)
               
               
            }
            if(ppo === Object.entries(object_response).length){
                this.setState({unread: counter});
                this.setState({list:this.state.og_list})
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
                unreadNum =unreadNum+1;
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
                this.setState({elem: notification_Array,unread:unreadNum});
            }
        }
    }
    componentDidMount(){
        let  emailReq = {
            email: localStorage.getItem("emailSession")
        }

        axios.post('https://cryptosis-server.herokuapp.com/user/getNotificationObject/',emailReq)
            .then(response => {

                this.generateData(response.data)


            })
            .catch(err => {console.error(err);})
      }

    render() {
        return (
            <React.Fragment>
            
                <Sidebar unread={this.state.unread}/>

            <div className="md:ml-64">

                <Container className="mt-3" fluid>

                    <Card  >
                        <Card.Header >
                           
                           
                            <Push className="btn btn-cryptosis"/>
                            <button  onClick={this.handleDeleteALL} type="button" className="btn-cryptosis text-blueGray-600 mr-0 mt-1 ml-2 text-sm uppercase font-bold px-0 float-right"><i className="fas fa-trash-alt"></i>&nbsp;Clear all Notifications</button>
                            
                        </Card.Header>
                        <Card.Body style={{height:"50%"}} >
                          
                            
                                <Row>
                                    <div className="col-md-4" style={{borderRight:"1px solid #c1c1c1"}}>
                                        <p className="text-blueGray-600 mr-0 mt-1 ml-2 text-sm uppercase font-bold px-0">Filter &amp; refine</p>
                                            {
                                                filterOptions.map(element => {
                                                    return( <div>
                                                            <Checkbox value={element} onChange={this.handleSelect} style={{ color: "#03989e", marginRight: 0 }} />
                                                            <span className="text-blueGray-600 mr-0 mt-1 ml-2 text-md  px-0">View <strong>{element}</strong> notifications</span>
                                                            
                                                            </div>
                                                           
                                                        )
                                                })
                                            }

                                            {/* <p>From</p>
                                            <DayPickerInput style={{width:"30%"}} onDayChange={this.handleDayChange} /> 

                                            <p>To</p>
                                            <DayPickerInput style={{width:"30%"}} onDayChange={this.handleDayChange} />
                                             */}
                                        
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row grid-15-gutter">
                                            {
                                                this.state.list.map((obj,index)=>{
                                                    return(
                                                        <div className="col-md-6" key={index}>
                                                            {obj.read ?
                                                            
                                                            <div className="card panel-read">
                                                                <div className="toast-header">
                                                                    <Link to={{pathname:"/home/DetailedInfo", state:{coin_name:obj.content.split(" ")[0], coin_symbol:"btc", coin_id:"bitcoin"}}} onClick={()=>{this.handleView(obj.time)}}>
                                                                        <span className= "text-blueGray-700 mr-auto uppercase font-bold">{obj.content.split(" ")[0]} &nbsp;</span>
                                                                    </Link>
                                                                    <small>{moment(obj.time).format('DD/MM/YYYY HH:mm')}</small>
                                                                    <button type="button" onClick={()=>{this.handleDelete(obj.time)}} value={obj.time} className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="media-body">
                                                                    <Hyperlink linkDefault={true}>
                                                                        <Text>{obj.content}</Text>
                                                                    </Hyperlink>
                                                                </div> 
                                                            </div>
                                                           :
                                                            <div className="card panel-unread">
                                                                <div className="toast-header">
                                                                    <Link to={{pathname:"/home/DetailedInfo", state:{coin_name:obj.content.split(" ")[0], coin_symbol:"btc", coin_id:"bitcoin"}}} onClick={()=>{this.handleView(obj.time)}}>
                                                                        <span className= "text-blueGray-700 mr-auto uppercase font-bold">{obj.content.split(" ")[0]}&nbsp;</span>
                                                                    </Link>
                                                                    <small>{moment(obj.time).format('DD/MM/YYYY HH:mm')}</small>
                                                                    <button type="button" onClick={()=>{this.handleDelete(obj.time)}} value={obj.time} className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="media-body">
                                                                    <Hyperlink linkDefault={true}>
                                                                        <Text>{obj.content}</Text>
                                                                    </Hyperlink>
                                                                </div>
                                                            </div>
                                                            }
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
            </React.Fragment>
        );
    }
}

export default Notifications;
