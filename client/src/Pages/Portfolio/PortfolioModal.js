import React, {useEffect, useState} from 'react';
import "./Modal.css"
import Sidebar from "../../components/Sidebar/Sidebar";

import axios from "axios";

import {Modal} from "react-bootstrap";


export default function PortfolioModal (props) {

    let [loading, setLoading] = useState(true);
    let [coinData, setCoinData] = useState([])
    const [searchCrypto, setSearchCrypto] = useState("");
    let [cryptos, setCryptos] = useState([]);
    let [show, setShow] = useState(props.show);

    useEffect( () => {
        axios.get('https://api.coingecko.com/api/v3/coins/')
            .then( response => {
                setCoinData(response.data);
            })
            .catch( error => {
                console.log(error);
            })

            setShow(props.show)

    },[props.show]);

    const searchCoin = (event) => { setSearchCrypto(event.target.value) }


    //filter list based on the search input
    const searchedCryptos = cryptos.filter((crypto)=>{

        return crypto.name.toLowerCase().includes(searchCrypto.toLowerCase()) ||  crypto.symbol.toLowerCase().includes(searchCrypto.toLowerCase())
    })

    return(

        <React.Fragment>
            <Sidebar/>

            <Modal size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered onHide={props.cancel} show={show} style={{textAlign:"center"}}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Select coin:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    {
                        props.text != null ? <React.Fragment>
                            <p>{props.text}</p>
                        </React.Fragment>:<React.Fragment>
                            <h4>Oops</h4>
                            <p>Looks like you're not logged in. Please log in to access to more features</p>
                        </React.Fragment>
                    }

                </Modal.Body>
                <Modal.Footer className="justify-center" >
                    <button onClick={props.cancel} className="btn text-xs uppercase" style={{backgroundColor:"#03989e",fontWeight:"bold"}}>Cancel</button>
                    <button onClick={props.continue} className="btn text-xs uppercase" style={{backgroundColor:"#03989e",fontWeight:"bold"}}>{props.text != null ? <React.Fragment>Add</React.Fragment> : <React.Fragment>Login</React.Fragment>}</button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
