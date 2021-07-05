import "bootstrap/dist/css/bootstrap.css";
import { Markup } from 'react-render-markup'

export default function Overview({coin}){

    return(
        <>
        {/* <div className="container mt-16 mb-12">
            <div className="row">
                <div className="col-4">
                    <img src={coin.image.large}/>
                </div>
                <div className="col-8">
                    <p className="text-sm">  <Markup markup={coin.description.en} /></p>
                </div>
            </div>
        </div>

        <div className="container mb-3" style={{margin:"auto"}}>
            <div className="row">
                <div className="col-12">
                    <div className="d-inline"><span className="badge badge-primary rounded-circle p-4"><i class="fas fa-hashtag fa-3x"></i><h1 className="d-inline ml-2">{coin.market_cap_rank}</h1></span></div>
                    <div className="d-inline float-right mt-4 uppercase font-bold p-2 px-0" ><a style={{color:"black",textDecoration:"none"}} href={coin.links.homepage}> <i class="fas fa-link"></i> Visit {coin.name} </a></div>
                </div>
            </div>
        </div>
        <div className="container" style={{margin:"auto"}}>
             <div className="row" style={{textAlign:"center"}}>

                <div className="col-4">
                <div className="uppercase font-bold p-2 px-0" style={{color:"#58667e"}}>Current price</div> 
                    <h2 className="font-bold">R {coin.market_data.current_price.zar.toLocaleString()}</h2>
                    <hr/>
                </div>
                <div className="col-4">
                    <div className="uppercase font-bold p-2 px-0" style={{color:"#58667e"}}>Market cap</div> 
                    <h2 className="font-bold">R {coin.market_data.market_cap.zar.toLocaleString()}</h2>
                    <hr/>
                </div>
                <div className="col-4">
                    <div className="uppercase font-bold p-2 px-0" style={{color:"#58667e"}}>Total volume</div> 
                    <h2 className="font-bold">R {coin.market_data.total_volume.zar.toLocaleString()}</h2>
                    <hr/>
                </div>
            </div>
            
        </div>
       
  
        <div className="container mt-16">
            <div className="row"> 
                <div className="col-8">
                </div>
                <div className="col-4">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>Price change in 1 hour</td>
                                <td >{coin.market_data.price_change_percentage_1h_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_1h_in_currency.zar}</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_1h_in_currency.zar}</span>} </td>
                            </tr>
                            <tr>
                                <td>Price change in 24 hours</td>
                                <td>{coin.market_data.price_change_percentage_24h_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_24h_in_currency.zar}</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_24h_in_currency.zar}</span>}</td>
                            </tr>
                            <tr>
                                <td>Price change in 7 days</td>
                                <td>{coin.market_data.price_change_percentage_7d_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_7d_in_currency.zar}</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_7d_in_currency.zar}</span>}</td>
                            </tr>
                            <tr>
                                <td>Price change in 14 days</td>
                                <td>{coin.market_data.price_change_percentage_14d_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_14d_in_currency.zar}</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_14d_in_currency.zar}</span>}</td>
                            </tr>
                            <tr>
                                <td>Price change in 30 days</td>
                                <td>{coin.market_data.price_change_percentage_30d_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_30d_in_currency.zar}</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_30d_in_currency.zar}</span>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="container">
        <div className=" text-sm p-2 px-0" ><span className="uppercase font-bold">Last updated at : </span> {coin.market_data.last_updated}</div>
        </div> */}
        </>
    )
}