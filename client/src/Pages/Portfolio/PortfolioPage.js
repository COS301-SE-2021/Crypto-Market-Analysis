import React from 'react';
import { Form,Row,Col,InputGroup} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Portfolio from "./Portfolio"
import {Link} from "react-router-dom";
import {Button, TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Buttons from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import SendIcon from "@material-ui/icons/Send"
import DeleteIcon from "@material-ui/icons/Delete"
import LinkIcon from "@material-ui/icons/Link"

import {
    SafeAreaView,
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
            sentiment_res:"",
            elem:[],
            deleted:"",
            change: '',
            response:{},
            change_id: '',
            change_symbol:  "",
            total: 0
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
        this.handleToUpdate = this.handleToUpdate.bind(this);
    }
    handleToUpdate(id,symbol){
        this.setState({change_id:id,change_symbol:symbol});

    }

    generateInvestment= (response) => {

        const arrOfElements = [];
        let index = 1;
        let analytics = '';
        for (const [key, value] of Object.entries(response.data)) {
            let analyseReq = {
                article: value.sentiment || 'i have to see more of it'
            }
            axios.post('https://analysis-services-api.herokuapp.com/ArticleAnalytics', analyseReq)
                .then((response) => {
                    analytics = 'no sentiment for this cryptoCurrency';

                    let portfoliofetch = {
                        email: localStorage.getItem("emailSession"),
                        coin_id: key,
                        symbol: value.crypto_symbol,
                        purchase: value.Buy

                    }
                    axios.post('http://localhost:8080/user/portfolio', portfoliofetch)
                        .then((last_response) => {

                            arrOfElements.push(
                                <tr style={{overflowX:"auto"}}>
                                    <th scope="row">
                                        <img style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: 15,
                                            borderWidth: 0.5,
                                            borderColor: "#ddd"
                                        }} src={last_response.data.crypto_data.map(a => a.image)} alt="Logo"/>
                                    </th>
                                    <td>
                                        <Link style={{fontColor: "black"}} to={{
                                            pathname: "/home/DetailedInfo",
                                            state: {coin_name: key, coin_symbol: value.crypto_symbol, coin_id: key}
                                        }}>
                                            <h4>{key} <LinkIcon/></h4>
                                        </Link>
                                    </td>
                                    <td>{value.Buy}</td>
                                    <td>R{last_response.data.current_price}</td>
                                    {last_response.data.predicted_price === 0 ? (
                                        <td style={{color: 'red'}}>Not/Available at the Moment</td>
                                    ) : (
                                        <td>R{last_response.data.predicted_price}</td>
                                    )}
                                    {response.data === 'positive' ? (
                                        <td>
                                            <span style={{color: 'green'}} className="text-green-500"><i
                                                className="fas fa-arrow-up"/> {response.data || analytics}</span>
                                        </td>
                                    ) : response.data === 'negative' ? (
                                            <td>
                                                <span style={{color: 'red'}} className="text-green-500"><i
                                                    className="fas fa-arrow-down"/> {response.data || analytics}</span>
                                            </td>
                                        ) :
                                        (
                                            <td>
                                                <span style={{color: 'blue'}} className="text-green-500"><i
                                                    className="fas fa-arrows-alt-h"/> {response.data || analytics}</span>
                                            </td>
                                        )

                                    }


                                        {last_response.data.crypto_data[0].price_change_percentage_24h < 0 ? (
                                        <td className='coin-percent red'> {last_response.data.crypto_data[0].price_change_percentage_24h.toFixed(2)}% </td>
                                       ) : (
                                        <td className='coin-percent green'> {last_response.data.crypto_data[0].price_change_percentage_24h.toFixed(2)}% </td>
                                        )}

                                    <td>
                                        <Buttons onClick={() => this.handleDelete(key)}> <DeleteIcon /> </Buttons>
                                    </td>
                                </tr>
                            )
                            this.setState({elem: arrOfElements});


                        })
                })
            index = index + 1;
        }
    }
    handleDelete= (e) =>{
        let portfolio_Req_Delete = {
            email:localStorage.getItem("emailSession"),
            coin_id:e
        }
        axios.post('http://localhost:8080/user/deleteportfolio',portfolio_Req_Delete)
            .then((response) => {
                this.generateInvestment(response);
            })
        window.location.reload(true);
    }
    handleAddInvestment= (e) =>{
        e.preventDefault()

        let  portfolio_Req = {
            email: localStorage.getItem("emailSession"),
            coin_id: this.state.change_id,
            symbol:this.state.change_symbol,
            purchase:this.state.buy,
            sentiment:this.state.sentiment || 'i have to see more of it'
        }

        axios.post('http://localhost:8080/user/portfolioSave',portfolio_Req)
            .then(() => {

                portfolio_Req = {
                    email: localStorage.getItem("emailSession"),
                    coin_id: this.state.change_id
                }
                axios.post('http://localhost:8080/user/getportfolio',portfolio_Req)
                    .then((response) => {
                        this.generateInvestment(response);

                    })
                window.location.reload(true);
            })


    }
    componentDidMount(){

        let  portfolio_Req = {
            email: localStorage.getItem("emailSession"),
            coin_id: ""
        }

        axios.post('http://localhost:8080/user/getportfolio',portfolio_Req)
            .then((response) => {
                     this.generateInvestment(response);
            })
    }

    render() {
        const handleToUpdate = this.handleToUpdate;
        return (

            <React.Fragment>
                <Sidebar />


                <div className="md:ml-64" style={{fontFamily:"Nunito"}}>
                    <div className="container" >

                        <div>
                            <Box component={"span"} style={{display: "flex",
                                justifyContent:'flex-end',
                                alignItems:"flex-end",
                                paddingTop:5,
                                paddingBottom: 5,
                                paddingRight: 20}}>

                                <Button startIcon= {<AddIcon />} variant={'contained'} style={{
                                    textAlign: "center",
                                    backgroundColor: "blue",
                                    color:"#FFFFF0",
                                    padding: "5px 15px",
                                    borderRadius: "5px",
                                    outline: "5px",
                                    width: "20%",
                                }} data-target="#tableForm" data-toggle="modal" >
                                    Add transaction
                                </Button>

                            </Box>
                        </div>

                        <div>
                            <Box component={"span"} style={{display: "flex",
                                justifyContent:'flex-start',
                                alignItems:"flex-start",
                                paddingTop:50,
                                paddingBottom: 5,
                                backgroundColor: "#ADD8E6",
                                color:"#FFFFF0",
                                paddingLeft: 20}}>
                                   <h2>Assets</h2>
                            </Box>
                        </div>

                {/* GET a QUOTE MODAL */}
                <div className="modal fade" id="tableForm" tabIndex="-1" role="dialog" aria-labelledby="quoteForm" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content p-md-3">

                            <div className="modal-body">
                               <Portfolio handleToUpdate = {handleToUpdate.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
                        <div className="modal fade" id="quoteForm" tabIndex="-1" role="dialog" aria-labelledby="quoteForm" aria-hidden="true">
                            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div className="modal-content p-md-3">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Track cryptocurrency <span className="text-primary">investment</span></h4>
                                        <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">??</span></button>
                                    </div>
                                    <div className="modal-body">
                                        <Form>
                                            <Row className="align-items-center">
                                                <Col sm={4} className="my-1">

                                                    <InputGroup>

                                                        <TextField disabled={true} required label={'Crypto id'} id="inlineFormInputName" value={this.state.change_id} onChange={() => this.setState({ id: this.state.change_id})} placeholder={this.state.coin_name}>

                                                        </TextField>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={4} className="my-1">
                                                    <InputGroup>
                                                        <TextField disabled={true} required label={'Crypto symbol'} id="inlineFormInputGroupUsername" value={this.state.change_symbol} onChange={() => this.setState({ symbol: this.state.change_symbol })} placeholder={this.state.coin_symbol}>
                                                        </TextField>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={3} className="my-1">
                                                    <InputGroup>
                                                        <TextField required label={"Quantity"} id="inlineFormInputGroupUsername " value={this.state.buy} onChange={e => this.setState({ buy: e.target.value })} placeholder="Enter Quantity Amount">
                                                        </TextField>
                                                    </InputGroup>
                                                </Col>
                                                <Col lg="auto" className="my-1">
                                                    <TextField multiline cols={"12"} rows={"3"} margin={"normal"} label={"Sentiment"} className="form-control" id="exampleFormControlTextarea1" value={this.state.sentiment} onChange={e => this.setState({ sentiment: e.target.value })}  placeholder="Enter Your feelings/Opinion">

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
                            <div className="table-responsive" style={{overflowX:"auto"}}>
                                <table className="table sort-table text-grey-darkest" style={{fontFamily: 'Nunito'}}>
                                    <thead className="bg-grey-dark text-black text-normal ">
                                        <tr>
                                            <th scope="col"/>
                                            <th scope="col">Name</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Current Value</th>
                                            <th scope="col">Predicted Value</th>
                                            <th scope="col">Sentiment </th>

                                            <th scope="col"> 24H </th>
                                            <th scope="col">Actions</th>
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
                </div>
            </React.Fragment>
        )
    };
}
export default Testing;