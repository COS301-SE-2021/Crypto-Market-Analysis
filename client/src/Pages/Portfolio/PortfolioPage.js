import React from 'react';
import { Form, Button, Alert,Row,Col ,InputGroup} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";

class Testing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            symbol: "",
            buy: "",
            elem:[]
        }
        this.handleAddInvestment = this.handleAddInvestment.bind(this);
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
                console.log(data);
                this.setState({symbol: this.state.symbol});
            })
    }
    componentDidMount(){
        let  portfolio_Req = {
            email: localStorage.getItem("emailSession"),
            coin_id: ""
        }

        axios.post('http://localhost:8080/user/getportfolio',portfolio_Req)
            .then((response) => {
                console.log(response.data);
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
                                    console.log(last_response.data)
                                     console.log(last_response.data.current_price)
                                    console.log(last_response.data.crypto_data.image)
                            console.log(last_response.data.crypto_data.map(a => a.image))
                            arrOfElements.push(<tr>
                                <th scope="row"><img src={last_response.data.crypto_data.map(a => a.image)} alt="Logo" /></th>
                                <td>
                                    <button
                                        className="bg-primary hover:bg-primary-dark text-white font-light py-1 px-2 rounded-full">
                                        {key}
                                    </button>
                                </td>

                                <td>{value.Buy}</td>
                                <td>{Math.round(last_response.data.current_price)}</td>
                                <td>{Math.round(last_response.data.predicted_price)}</td>
                                <td>
                                    <span className="text-green-500"><i className="fas fa-arrow-up"></i>5%</span>
                                </td>
                            </tr>)
                            this.setState({elem: arrOfElements});

                        })
                      console.log(Object.entries(response.data).length)
                    console.log(index)
                     index=index+1;
                    if(index === Object.entries(response.data).length){

                    }
                }



            })


    }
    render() {

        return (

            <div className="maincontainer">
                <Sidebar />
                <div className="md:ml-64">
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
                                              <Form.Control id="inlineFormInputName" value={this.state.id} onChange={e => this.setState({ id: e.target.value })} placeholder="Enter cryto ID" />
                                            </InputGroup>
                                        </Col>
                                        <Col sm={4} className="my-1">
                                            <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                                                Symbol<span className="text-primary ml-1">*</span>
                                            </Form.Label>
                                            <InputGroup>
                                                <Form.Control id="inlineFormInputGroupUsername" value={this.state.symbol} onChange={e => this.setState({ symbol: e.target.value })} placeholder="Enter the symbol" />
                                            </InputGroup>
                                        </Col>
                                        <Col sm={3} className="my-1">
                                            <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                                                Buy<span className="text-primary ml-1">*</span>
                                            </Form.Label>
                                            <InputGroup>
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
                <div className="table-responsive">
                <table className="table text-grey-darkest">
                    <thead className="bg-grey-dark text-black text-normal">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cryptocurrency</th>
                        <th scope="col">Value</th>
                        <th scope="col">current</th>
                        <th scope="col">Predicted</th>
                        <th scope="col">Change</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.elem}
                    </tbody>
                </table>
                </div>
                </div>
            </div>


        )
    };
}

export default Testing;