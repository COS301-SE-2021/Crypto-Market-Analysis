import React, {useEffect, useState} from 'react';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const Portfolio = (props) => {
    const handleToUpdate = props.handleToUpdate;
    let [loading, setLoading] = useState(true);
    const [searchCrypto, setSearchCrypto] = useState("");
    let [cryptos, setCryptos] = useState([]);

    useEffect( () => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=10&page=1&sparkline=false')
            .then(async (response_data) => {

                setCryptos(response_data.data)
                setLoading(false)

            })
            .catch(err => {
                console.error(err)
                setLoading(false)

            })

    },[]);

    const searchCoin = (event) => { setSearchCrypto(event.target.value) }


    //filter list based on the search input
    const searchedCryptos = cryptos.filter((crypto)=>{

        return crypto.name.toLowerCase().includes(searchCrypto.toLowerCase()) ||  crypto.symbol.toLowerCase().includes(searchCrypto.toLowerCase())
    })


    return(

        <div>

            <div className="crypto-search">
                <input type="search" className="form-control rounded" placeholder="Search..."
                       onChange={searchCoin} />
            </div>

            <div className="container">

                <div className="row">
                    <div className=" overflow-auto block crypto-wrapper" style={{height:"600px",margin:"auto"}}>
                        {loading ? <ClipLoader loading={loading} size={150} />:
                            searchedCryptos.length < 1 ? <div id="response-alert"><p className="text-center">Oops :( <br/>We don't have that coin</p></div>
                                :<React.Fragment>
                                    {searchedCryptos.map((myCrypto,index) =>{

                                        return(
                                            <React.Fragment>
                                                <div style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center"}} key={index} className="body">
                                                    <div className='coin-row'>
                                                        <div className='coin'>
                                                            <img src={myCrypto.image} alt='crypto' />
                                                            <h1>{myCrypto.name}</h1>
                                                            <h1 className='coin-symbol'>{myCrypto.symbol}</h1>



                                                            <button onClick={() => handleToUpdate(myCrypto.id,myCrypto.symbol)} to={{
                                                                pathname: "/portfolios",coin_symbol: myCrypto.symbol, coin_name: myCrypto.id

                                                            }} data-dismiss="modal" aria-hidden="true" data-target="#quoteForm" data-toggle="modal" color={"transparent"}>

                                                                <KeyboardArrowRightIcon />
                                                            </button>


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


    )
}
export default Portfolio;