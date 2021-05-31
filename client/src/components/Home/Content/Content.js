import "bootstrap/dist/css/bootstrap.css";
import { Icon } from "coinmarketcap-cryptocurrency-icons";
import GraphReport from "../GraphReport/GraphReport";

import "./Content.css";
function Content()
{
    return(
        <div id="content-view" className="col-8">
            <div id="cards-row" className="row" >
                <div className="col-m-6 col-xl-4" >
                    <div className="card">
                        <div>
                            <span><Icon i="btc" size={35}/></span>
                            <h5 className="d-inline-block mb-3 ml-3">Bitcoin
                                <span>(24h)</span>
                            </h5>
                        </div>
                        <h4> USD 1254.36 <span className="badge badge-success ml-2"> +06% </span> </h4>
                    </div>
                </div>

                <div className="col-m-6 col-xl-4" >
                    <div className="card">
                        <div>
                            <span><Icon i="eth" size={35}/></span>
                            <h5 className="d-inline-block mb-3 ml-3">Etherium
                                <span>(24h)</span>
                            </h5>
                        </div>
                        <h4> USD 1254.36 <span className="badge badge-danger ml-2"> -06% </span> </h4>
                    </div>
                </div>

                <div className="col-m-6 col-xl-4" >
                    <div className="card">
                        <div>
                            <span><Icon i="ltc" size={35}/></span>
                            <h5 className="d-inline-block mb-3 ml-3">Litecoin
                                <span>(24h)</span>
                            </h5>
                        </div>
                        <h4> USD 1254.36 <span className="badge badge-danger ml-2"> -06% </span> </h4>
                    </div>
                </div>
                <div className="col-12" style={{height: "400px"}}>
                    <div className="card" style={{height: "370px",margin:"20px auto auto",}}>
                        <GraphReport/>
                        {/*<nav className="navbar  bg-light justify-content-between">*/}
                        {/*    <ul className="navbar-nav">*/}
                        {/*        <li className="nav-item">*/}
                        {/*            <a href="#" className="nav-link">Some details of the coin</a>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</nav>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Content