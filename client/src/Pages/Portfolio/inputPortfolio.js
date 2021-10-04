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

class Input extends React.Component {

    constructor(props) {


        super(props)
        this.state = {
            id: "",
            symbol: "",
        }
    }
    render() {

        return (<div className="modal fade" id="quoteForm" tabIndex="-1" role="dialog" aria-labelledby="quoteForm" aria-hidden="true">
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

                                        <TextField disabled={true} required label={ 'this is the data '+ this.props.coin_id} id="inlineFormInputName" value={this.state.id} onChange={e => this.setState({ id: e.target.value })} placeholder={this.state.coin_name}>

                                        </TextField>
                                    </InputGroup>
                                </Col>
                                <Col sm={4} className="my-1">
                                    <InputGroup>
                                        <TextField disabled={true} required label={ 'this is the data '+ this.props.coin_symbol} id="inlineFormInputGroupUsername" value={this.state.symbol} onChange={e => this.setState({ symbol: e.target.value })} placeholder={this.state.coin_symbol}>
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
        </div>)
    }
}
export default Input