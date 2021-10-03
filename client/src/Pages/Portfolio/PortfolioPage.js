import React from 'react';
import { Form, Button, Alert,Row,Col ,InputGroup} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import {Link} from "react-router-dom";
import {TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Buttons from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import SendIcon from "@material-ui/icons/Send"
import DeleteIcon from "@material-ui/icons/Delete"
import LinkIcon from "@material-ui/icons/Link"

import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";
import Container from "@material-ui/core/Container";


class Testing extends React.Component {

    constructor(props) {


        super(props)
        this.state = {
            id: "",
            symbol: "",
            buy: "",
            sentiment:"",
            elem:[],
            change: '',
            response:{}
        }
        this.state = {
            box: {
                height: 80,
                display: "inline-flex",
                padding:1,
            },
            centerBox:{
                display: "flex",
                justifyContent:'flex-end',
                alignItems:"flex-end",
                paddingTop:100,
                paddingBottom: 0,
                paddingRight: 20
            }
        }
        this.handleAddInvestment = this.handleAddInvestment.bind(this);
        this. generateInvestment= this. generateInvestment.bind(this);
    }
    generateInvestment= (response) => {
        const arrOfElements = [];
        let index = 1;
        for (const [key, value] of Object.entries(response.data)) {
            let portfoliofetch = {
                email:localStorage.getItem("emailSession"),
                coin_id: key,
                symbol: value.crypto_symbol,
                purchase: value.Buy

            }
            axios.post('http://localhost:8080/user/portfolio',portfoliofetch )
                .then((last_response) => {
                    console.log(last_response.data.crypto_data)
                    arrOfElements.push(
                        <tr>
                            <th scope="row">
                                <img style={{width:30, height:30, borderRadius: 15,borderWidth:0.5, borderColor: "#ddd"}} src={last_response.data.crypto_data.map(a => a.image)} alt="Logo" />
                            </th>
                            <td>
                                <Link style={{fontColor:"black"}} to={{pathname:"/home/DetailedInfo", state:{coin_name:key, coin_symbol:value.crypto_symbol, coin_id:key}}}>
                                    <h4>{key} <LinkIcon /> </h4>

                                </Link>
                            </td>
                            <td>{value.Buy}</td>
                            <td>R{Math.round(last_response.data.current_price)}</td>
                            <td>R{Math.round(last_response.data.predicted_price)}</td>
                            <td>
                                <span className="text-green-500"><i className="fas fa-arrow-up"></i>5%</span>
                            </td>
                            <td> <DeleteIcon /> </td>
                        </tr>
                    )
                    this.setState({elem: arrOfElements});

                })
            console.log(Object.entries(response.data).length)
            console.log(index)
            index=index+1;
            if(index === Object.entries(response.data).length){

            }
        }

    }
    handleAddInvestment= (e) =>{
        e.preventDefault()
        console.log(this.state.id)
        console.log(this.state.buy)
        console.log(this.state.symbol)
        console.log(localStorage.getItem("emailSession"))
        let  portfolio_Req = {
            email: localStorage.getItem("emailSession"),
            coin_id: this.state.id,
            symbol:this.state.symbol,
            purchase:this.state.buy
        }

        axios.post('http://localhost:8080/user/portfolioSave',portfolio_Req)
            .then((data) => {
                portfolio_Req = {
                    email: localStorage.getItem("emailSession"),
                    coin_id: this.state.id
                }

                axios.post('http://localhost:8080/user/getportfolio',portfolio_Req)
                    .then((responseobj) => {
                        this.setState({response: responseobj});
                        this.generateInvestment(responseobj);


                    })
            })

    }
    componentDidMount(){
        let  portfolio_Req = {
            email: localStorage.getItem("emailSession"),
            coin_id: ""
        }

        axios.post('http://localhost:8080/user/getportfolio',portfolio_Req)
            .then((response) => {
                //console.log(response.data);
                     this.generateInvestment(response);
            })
    }
    render() {

        return (

<>
                <Sidebar />

                <div className="md:ml-64" style={{fontFamily:"Nunito"}}>
                    <h1>Portfolio</h1>
                            <div>
                                <Box component={"span"} style={{display: "flex",
                                    justifyContent:'flex-end',
                                    alignItems:"flex-end",
                                    paddingTop:20,
                                    paddingBottom: 5,
                                    paddingRight: 20}}>
                                    <Buttons startIcon= {<AddIcon />} color={"primary"} variant={'contained'} style={{
                                        textAlign: "center",
                                        color:"#FFFFF0",
                                        padding: "5px 5px",
                                        borderRadius: "8px",
                                        outline: "1px",
                                        width: "20%",
                                        fontSize:10,
                                    }} data-target="#quoteForm" data-toggle="modal" >
                                        Add transaction
                                    </Buttons>
                                </Box>

                                {/*<button className="btn btn-primary" type="button" data-target="#quoteForm" data-toggle="modal">Add Investment</button>*/}
                            </div>



                {/* GET a QUOTE MODAL */}
                <div className="modal fade" id="quoteForm" tabIndex="-1" role="dialog" aria-labelledby="quoteForm" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content p-md-3">
                            <div className="modal-header">
                                <h4 className="modal-title">Track cryptocurrency <span className="text-primary">investment</span></h4>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                            </div>
                            <div className="modal-body">
                                <Form>
                                    <Row className="align-items-center">
                                        <Col sm={4} className="my-1">
                                            {/* <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                                                ID <span className="text-primary ml-1">*</span>
                                            </Form.Label>*/}
                                            <InputGroup>
                                                {/*<Form.Control id="inlineFormInputName" value={this.state.id} onChange={e => this.setState({ id: e.target.value })} placeholder="Enter cryto ID" />*/}

                                                <TextField required label={"ID"} id="inlineFormInputName" value={this.state.id} onChange={e => this.setState({ id: e.target.value })} placeholder="Enter cryto ID">

                                                </TextField>
                                            </InputGroup>
                                        </Col>
                                        <Col sm={4} className="my-1">
                                            {/*<Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                                                Symbol<span className="text-primary ml-1">*</span>
                                            </Form.Label>*/}
                                            <InputGroup>
                                                {/*<Form.Control id="inlineFormInputGroupUsername" value={this.state.symbol} onChange={e => this.setState({ symbol: e.target.value })} placeholder="Enter the symbol" />*/}
                                                <TextField required label={"Symbol"} id="inlineFormInputGroupUsername" value={this.state.symbol} onChange={e => this.setState({ symbol: e.target.value })} placeholder="Enter the symbol">

                                                </TextField>
                                            </InputGroup>
                                        </Col>
                                        <Col sm={3} className="my-1">
                                            {/*<Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                                                Buy<span className="text-primary ml-1">*</span>
                                            </Form.Label>*/}
                                            <InputGroup>
                                                {/*<Form.Control id="inlineFormInputGroupUsername" value={this.state.buy} onChange={e => this.setState({ buy: e.target.value })} placeholder="Enter Investment Amount" />*/}
                                                <TextField required label={"Buy"} id="inlineFormInputGroupUsername" value={this.state.buy} onChange={e => this.setState({ buy: e.target.value })} placeholder="Enter Investment Amount">

                                                </TextField>
                                            </InputGroup>



                                        </Col>
                                        <Col lg="auto" className="my-1">
                                            <TextField multiline rows={"2"} margin={"normal"} label={"Sentiment"} className="form-control" id="exampleFormControlTextarea1" value={this.state.sentiment} onChange={e => this.setState({ sentiment: e.target.value })} >

                                            </TextField>

                                        </Col>
                                        <Col xs="auto" className="my-1">
                                            <Container>
                                                <Box component={"span"} style={{
                                                    display: "inline-flex",
                                                    justifyContent:'center',
                                                    alignItems:"center",
                                                    paddingTop:50,
                                                    paddingBottom: 5,
                                                }}>
                                                <Buttons startIcon= {<SendIcon />} endIcon={<KeyboardArrowRightIcon />} color={"primary"} variant={'contained'} style={{
                                                    textAlign: "center",
                                                }} type="submit" onClick={this.handleAddInvestment} data-dismiss="modal" aria-hidden="true" >Submit</Buttons>
                                                </Box>
                                                </Container>
                                        </Col>
                                    </Row>

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                    <SafeAreaView style={{flex: 1, backgroundColor:"white"}}>
                    <ScrollView style={{flex:1}}>
                    <div className="table-responsive">
                <table className="table sort-table text-grey-darkest" style={{fontFamily: 'Nunito'}}>
                    <thead className="bg-grey-dark text-black text-normal ">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Current Value(R)</th>
                        <th scope="col">Predicted Value(R)</th>
                        <th scope="col">Sentiment </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.elem}
                    </tbody>
                </table>
                </div>

                    </ScrollView>
                        </SafeAreaView>
                </div>


</>

        )
    };
}

export default Testing;