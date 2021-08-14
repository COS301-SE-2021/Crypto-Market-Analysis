import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import SweetAlert from 'react-bootstrap-sweetalert'
import ClipLoader from "react-spinners/ClipLoader"
import axios from "axios";
import { Star, } from "@material-ui/icons";

import "../Settings/Settings.css"
import "./AllCrypto.css"
import ModalComp from "../../components/Modal/Modal"

const coins = ["btc","eth","usdt","bnb","ada","xrp","usdc","doge","dot","busd"]
export default function AllCryptos(props)
{
    let [cryptos, setCryptos] = useState([]);
    const [searchCrypto, setSearchCrypto] = useState("");
    const [show, setShow] = useState(false)
    const [showSweetAlert, setShowSweetAlert] = useState(false)
    const [alertTitle,setAlertTitle] = useState("")
    let [loading, setLoading] = useState(true);
    const history = useHistory()
   

    useEffect(async () => {
        let selectedCryptos = []
       
        let  userReq = {
            email: localStorage.getItem("emailSession"),
        }
        if(userReq.email != null){
            /*
            Request to get cryptocurrencies followed by the user
            */
            axios.post('http://localhost:8080/user/getUserCryptos/',userReq)
            .then(async(response) =>{
                /*
                Set default cryptos if data is not set else
                push cryptos to a list                  
                */
                await response.data.map((coin)=>{
                    selectedCryptos.push(coin)
                })  
                
            })
            .catch(err => {console.error(err);})
        }
        else{
            
            selectedCryptos = coins
        }
        getCoins(selectedCryptos)

      
    },[props.logged]);

    /*
        Get a list of coins from Coingecko. For each crypto, check if it matches crypto a user 
        follows and mark it as selected                  
    */
        function getCoins(coinsList){
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=250&page=1&sparkline=false')
        .then(async (response_data) => {
            
            await response_data.data.map((coin)=>{
                
            coinsList.forEach(element => {
                    if(element === coin.name){
                        coin.selected = true;
                    }
                })
            })
            setCryptos(response_data.data)
            setLoading(false)
        
        })
        .catch(err => {console.error(err);})
    }

    const onCancel =(e)=>{
        setShow(false);    
    }
    const OnContinue =()=>{
        history.push('/login')
      }

    const select = (name,type)=>{

        if(localStorage.getItem("emailSession") != null){
            selectFinalize(name,type)
            
        }
        else{
            setShow(true)
        }

    }
    const selectFinalize = (name,type) => {
        
        
            if(type == "cryptos"){
                cryptos =  [...cryptos.map((crypto)=>{
                    if(name == crypto.symbol){
                        crypto.selected = !crypto.selected;

                        /*
                            if selected add to favourite list else remove it
                        */
                        if(crypto.selected) {
                        
                            let  cryptoToAdd = {
                            email: localStorage.getItem("emailSession"),
                                symbol: crypto.symbol,
                                crypto_name: crypto.name,
                            }
                           
                            axios.post('http://localhost:8080/user/followCrypto/',cryptoToAdd).then(()=>{
                                setAlertTitle("Coin added")
                                setShowSweetAlert(true)
                                
                            })
                                .catch(err => {console.error(err);})
                            
                        }
                        else{
                            let  cryptoToRemove = {
                                email: localStorage.getItem("emailSession"),
                                symbol: crypto.symbol,
                            }
                            
                            axios.post('http://localhost:8080/user/unfollowCrypto/',cryptoToRemove).then(()=>{
                                setAlertTitle("Coin removed")
                                setShowSweetAlert(true)
                                
                            })
                                .catch(err => {console.error(JSON.stringify(err));})

                        }
                    }
                    return {
                        ...crypto
                    }
                })]
                setCryptos(cryptos)
            }
            
            let func = props.alert 
                func() //alert observer in parent component to trigger change in headerstat
    }

    //sets search to whats typed in the search input field
    const searchCoin = (event) => { setSearchCrypto(event.target.value) }
   

    //filter list based on the search input
    const searchedCryptos = cryptos.filter((crypto)=>{

        return crypto.name.toLowerCase().includes(searchCrypto.toLowerCase()) ||  crypto.symbol.toLowerCase().includes(searchCrypto.toLowerCase())
    })
    
    return(
        <>       
        <ModalComp show={show} cancel={onCancel} continue={OnContinue} />
        <SweetAlert show={showSweetAlert} success title={alertTitle} onConfirm={()=>{setShowSweetAlert(false)}}></SweetAlert>
         <div className="container">
            <div className="row"> 
                <div className="crypto-search">
                    <input type="search" className="form-control rounded" placeholder="Search..."
                                onChange={searchCoin}/>
                </div>
                <div className=" overflow-auto block crypto-wrapper" style={{height:"600px",margin:"auto"}}>
                    {loading ? <ClipLoader loading={loading} size={150} />:
                    searchedCryptos.length < 1 ? <p className="text-center">Oops :( <br/>We don't have that coin</p>
                    :<>
                        {searchedCryptos.map((myCrypto,index) =>{
                            
                            return(
                                <div key={index} className='coin-container'>


                                        <div className='coin-row'>
                                                <div className='coin'>
                                                   
                                                    {myCrypto.selected?<Star className="select-star" color="primary" onClick={()=>{select(myCrypto.symbol,"cryptos")}}/>:<Star className="select-star" color="action" onClick={()=>{select(myCrypto.symbol, "cryptos")}}/>}
                                                    <img src={myCrypto.image} alt='crypto' />
                                                    <h1>{myCrypto.name}</h1>
                                                    <p className='coin-symbol'>{myCrypto.symbol}</p>
                                                </div>
                                                <div className='coin-data'>
                                                    <p className='coin-price'>R{myCrypto.current_price}</p>
                                                    <p className='coin-volume'>R{myCrypto.total_volume.toLocaleString()}</p>

                                                    {myCrypto.price_change_percentage_24h < 0 ? (
                                                        <p className='coin-percent red'>{myCrypto.price_change_percentage_24h.toFixed(2)}%</p>
                                                    ) : (
                                                        <p className='coin-percent green'>{myCrypto.price_change_percentage_24h.toFixed(2)}%</p>
                                                    )}

                                                    <p className='coin-marketcap'>
                                                        Mkt Cap: R{myCrypto.market_cap.toLocaleString()}
                                                    </p>
                                                </div>
                                        </div>
                              </div>
                            )
                        })
                    }
                     </>}
                </div>
            </div>
        </div>
        </>
    );
}