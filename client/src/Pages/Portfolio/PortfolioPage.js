import React from 'react';
import { Form, Button, Alert,Row,Col ,InputGroup} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from "axios";


class Testing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            symbol: "",
            buy: ""
        }
        this.handleAddInvestment = this.handleAddInvestment.bind(this);
    }
    handleAddInvestment= (e) =>{
        e.preventDefault()
        console.log(this.state.id)
        console.log(this.state.buy)
        console.log(this.state.symbol)
        let  portfolio_Req = {
            email: localStorage.getItem("emailSession"),
            coin_id: this.state.id,
            symbol:this.state.symbol,
            purchase:this.state.buy
        }

        axios.post('https://localhost:8080/portfolioSave',portfolio_Req)
            .then(() => {

            })
    }
    render() {

        return (

            <div className="maincontainer">


                <div className="container py-5">


                    <div className="py-5">
                        <div className="row">

                            <div className="col-lg-6 mb-5">
                                <button className="btn btn-primary" type="button" data-target="#quoteForm" data-toggle="modal">Add Investment</button>
                            </div>

                        </div>
                    </div>
                </div>
                {/* GET a QUOTE MODAL */}
                <div className="modal fade" id="quoteForm" tabindex="-1" role="dialog" aria-labelledby="quoteForm" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content p-md-3">
                            <div className="modal-header">
                                <h4 className="modal-title">Track cryptocurrency <span class="text-primary">investment</span></h4>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                            </div>
                            <div className="modal-body">
                                <Form>
                                    <Row className="align-items-center">
                                        <Col sm={4} className="my-1">
                                            <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                                                ID <span className="text-primary ml-1">*</span>
                                            </Form.Label>
                                            <InputGroup>
                                              {/*<InputGroup.Text>@ID</InputGroup.Text>*/}
                                              <Form.Control id="inlineFormInputName" value={this.state.id} onChange={e => this.setState({ id: e.target.value })} placeholder="Enter cryto ID" />
                                            </InputGroup>
                                        </Col>
                                        <Col sm={4} className="my-1">
                                            <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                                                Symbol<span className="text-primary ml-1">*</span>
                                            </Form.Label>
                                            <InputGroup>
                                                {/*<InputGroup.Text>@Symbol</InputGroup.Text>*/}
                                                <Form.Control id="inlineFormInputGroupUsername" value={this.state.symbol} onChange={e => this.setState({ symbol: e.target.value })} placeholder="Enter the symbol" />
                                            </InputGroup>
                                        </Col>
                                        <Col sm={3} className="my-1">
                                            <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                                                Buy<span className="text-primary ml-1">*</span>
                                            </Form.Label>
                                            <InputGroup>
                                                {/*<InputGroup.Text>@Amount</InputGroup.Text>*/}
                                                <Form.Control id="inlineFormInputGroupUsername" value={this.state.buy} onChange={e => this.setState({ buy: e.target.value })} placeholder="Enter Investment Amount" />
                                            </InputGroup>
                                        </Col>
                                        <Col xs="auto" className="my-1">
                                            <Button type="submit" onClick={this.handleAddInvestment}>Submit</Button>
                                        </Col>
                                    </Row>

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    };
}

export default Testing;