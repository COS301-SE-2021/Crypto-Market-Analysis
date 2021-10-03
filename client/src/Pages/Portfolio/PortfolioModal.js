import React, {useEffect, useState} from 'react';
import "./Modal.css"
import Sidebar from "../../components/Sidebar/Sidebar";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";
import ClipLoader from "react-spinners/ClipLoader";
import {Star} from "@material-ui/icons";
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
                console.log("data is ", response.data);
            })
            .catch( error => {
                console.log(error);
            })

            setShow(props.show)


    },[props.show]);

    /*
       Get a list of coins from Coingecko. For each crypto, check if it matches crypto a user
       follows and mark it as selected
   */

    // function getCoins(coinsList){
    //     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=250&page=1&sparkline=false')
    //         .then(async (response_data) => {
    //
    //             console.log(response_data.data);
    //
    //
    //                 setCryptos(response_data.data)
    //                 setLoading(false)
    //
    //
    //         })
    //         .catch(err => {
    //             console.error(err)
    //             setLoading(false)
    //
    //         })
    // }
    // getCoins();
    //sets search to whats typed in the search input field
    const searchCoin = (event) => { setSearchCrypto(event.target.value) }


    //filter list based on the search input
    const searchedCryptos = cryptos.filter((crypto)=>{

        return crypto.name.toLowerCase().includes(searchCrypto.toLowerCase()) ||  crypto.symbol.toLowerCase().includes(searchCrypto.toLowerCase())
    })

    return(

        <React.Fragment>
            <Sidebar/>

            {/* <div className={"modalBackground"}>
                <div className={"modalContainer"}>
                    <div className={"titleCloseBtn"}>
                        <Button variant={'contained'} style={{
                            textAlign: "center",
                            backgroundColor: "transparent",
                            color:"black",
                            padding: "5px 5px",
                            borderRadius: "8px",
                            outline: "1px",
                            width: "0.1%"}} onClick={() => closeModal(false)}> X </Button>
                    </div>
                    <div className={"title"}>
                        <h1> Add Transaction  </h1>
                    </div>

                    <div className="crypto-search">
                        <input type="search" className="form-control rounded" placeholder="Search..."
                               onChange={searchCoin} />
                    </div>



                        <div className={"body"}>
                            {/*<div className="container">
<div className={"body"}>
                            <div className="row">
                                <div className=" overflow-auto block crypto-wrapper" style={{height:"600px",margin:"auto"}}>
                                    {loading ? <ClipLoader loading={loading} size={150} />:
                                        searchedCryptos.length < 1 ? <div id="response-alert"><p className="text-center">Oops :( <br/>We don't have that coin</p></div>
                                            :<React.Fragment>
                                                {searchedCryptos.map((myCrypto,index) =>{

                                                    return(
                                                        <React.Fragment>
                                                            <div key={index} className='body'>
                                                                <div className='coin-row'>
                                                                    <div className='coin'>
                                                                        <img src={myCrypto.image} alt='crypto' />
                                                                        <h1>{myCrypto.name}</h1>
                                                                        <p className='coin-symbol'>{myCrypto.symbol}</p>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    )}
                                                )
                                                }
                                            </React.Fragment>
                                    }
                                </div>
                            </div>
</div>
                        </div>
                            <p>List of cryptos will show here</p>

                        </div>

                    <div className={"footer"}>
                        <Button variant={'contained'} style={{
                            textAlign: "center",
                            color:"#FFFFF0",
                            padding: "5px 5px",
                            borderRadius: "8px",
                            outline: "1px",
                            width: "30%"}} onClick={() => closeModal(false)} id={"cancelBtn"}> Cancel </Button>
                        <Button variant={'contained'} style={{
                            textAlign: "center",
                            backgroundColor: "#58667e",
                            color:"#FFFFF0",
                            padding: "5px 5px",
                            borderRadius: "8px",
                            outline: "1px",
                            width: "30%"}} onClick={() => closeModal(false)} id={"cancelBtn"}> Confirm </Button>
                    </div>
                </div>
            </div>*/}

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
