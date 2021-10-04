import React from 'react';
import { Form,Row,Col,InputGroup} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Portfolio from "./Portfolio"
import {Link} from "react-router-dom";
import {AppBar, Button, TextField, Toolbar} from "@material-ui/core";
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
import Typography from "@material-ui/core/Typography";

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
            change_id: props.location.coin_symbol ||  '',
            change_symbol: props.location.coin_id || ""
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
                                    <td>R{Math.round(last_response.data.current_price)}</td>
                                    <td>R{Math.round(last_response.data.predicted_price)}</td>
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

                                    <td>
                                        2%
                                    </td>

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
            console.log(Object.entries(response.data).length)
            console.log(index)
            index = index + 1;
            if (index === Object.entries(response.data).length) {

            }

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
    }
    handleAddInvestment= (e) =>{
        e.preventDefault()
        let  portfolio_Req = {
            email: localStorage.getItem("emailSession"),
            coin_id: this.state.id,
            symbol:this.state.symbol,
            purchase:this.state.buy,
            sentiment:this.state.sentiment || 'i have to see more of it'
        }

        axios.post('http://localhost:8080/user/portfolioSave',portfolio_Req)
            .then((data) => {
                portfolio_Req = {
                    email: localStorage.getItem("emailSession"),
                    coin_id: this.state.id
                }
            })
                axios.post('http://localhost:8080/user/getportfolio',portfolio_Req)
                    .then((responseobj) => {
                        //this.setState({response: responseobj});
                         this.generateInvestment(responseobj);
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

        return (

            <React.Fragment>
                <Sidebar />


                <div className="md:ml-64" style={{fontFamily:"Nunito"}}>
                    <div className="container" >
                        <AppBar style={{ background:"transparent",
                            fontFamily: 'Nunito', width:"81.25%", textAlign:"center", position:"fixed", color:"black"}} elevation={1}>
                            <Toolbar style={{ width:'50%',
                                margin:'0 auto'} }>
                                <Typography variant={"h4"} style={{textAlign:"center"}}>
                                   Your Portfolio
                                </Typography>

                            </Toolbar>
                        </AppBar>
                        <div>
                            <Box component={"span"} style={{display: "flex",
                                justifyContent:'flex-end',
                                alignItems:"flex-end",
                                paddingTop:150,
                                paddingBottom: 5,
                                paddingRight: 20}}>

                                {/*<Buttons startIcon= {<AddIcon />} color={"primary"} variant={'contained'} style={{*/}
                                {/*    textAlign: "center",*/}
                                {/*    color:"#FFFFF0",*/}
                                {/*    padding: "5px 5px",*/}
                                {/*    borderRadius: "8px",*/}
                                {/*    outline: "1px",*/}
                                {/*    width: "20%",*/}
                                {/*    fontSize:10,*/}
                                {/*}} data-target="#quoteForm" data-toggle="modal" >*/}
                                {/*    Add transaction*/}
                                {/*</Buttons>*/}
                                <Button variant={'contained'} style={{
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
                                paddingLeft: 20}}>
                                   <h2>Your Assets</h2>
                            </Box>
                        </div>

                {/* GET a QUOTE MODAL */}
                <div className="modal fade" id="tableForm" tabIndex="-1" role="dialog" aria-labelledby="quoteForm" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content p-md-3">

                            <div className="modal-body">
                               <Portfolio/>
                            </div>
                        </div>
                    </div>
                </div>
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

                                                    <InputGroup>

                                                        <TextField disabled={true} required label={ 'this is the data '+ this.props.location.coin_name} id="inlineFormInputName" value={this.state.id} onChange={e => this.setState({ id: e.target.value })} placeholder={this.state.coin_name}>

                                                        </TextField>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={4} className="my-1">
                                                    <InputGroup>
                                                        <TextField disabled={true} required label={ 'this is the data '+ this.props.location.coin_symbol} id="inlineFormInputGroupUsername" value={this.state.symbol} onChange={e => this.setState({ symbol: e.target.value })} placeholder={this.state.coin_symbol}>
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
                                            <th scope="col">Gain/Loss </th>
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