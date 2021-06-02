import "bootstrap/dist/css/bootstrap.css";
import "./QuickView.css"
import {Search, Star} from "@material-ui/icons";
import React from "react";
import {Icon} from "coinmarketcap-cryptocurrency-icons";

const cryptos = [{Name:"Bitcoin",Code:"btc", Price:"R513 510,14"},
    {Name:"Litecoin",Code:"ltc", Price:"R2 554,79 "},
    {Name:"Etherium",Code:"eth", Price:"R37 193,58 "},
    {Name:"Ripple",Code:"xrp", Price:"R14,59"},
    {Name:"Tether",Code:"usdt",Price:"R14,34"}
];

class QuickView extends React.Component{
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.state = {
            cryptList: [...cryptos.map(crypto =>{ return {...crypto,selected:false} })],
            faveList:[]
        };
    }
    select(code){
        let newFavelist = this.state.faveList;

        this.setState({
            cryptList: [...this.state.cryptList.map((crypt,currIndex)=>{
                if(code==crypt.Code){
                    crypt.selected = !crypt.selected;

                    //if selected add to favourite list else remove it
                    if(crypt.selected){newFavelist.push(crypt)}
                    else{newFavelist = newFavelist.filter((item) => item.Code !== code);}
                }
                return {
                    ...crypt
                }
            })]
        })
        this.setState({faveList: [...newFavelist.map(crypto =>{ return {...crypto,selected:false} })]})
    }

    render()
    {
        const cryptoList = this.state;

        return(
            <div id="quick-view" className="col-4 content-container shadow">
                <div id="search-bar" className="input-group rounded">
                    <input type="search" className="form-control rounded" placeholder="Search..." aria-label="Search"
                           aria-describedby="search-addon"/>
                    <span id="search-icon"> <Search/> </span>{/* Insert Button for search */}
                </div>
                <div id="table-bar">
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Symbol</th>
                            <th scope="col">Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            cryptoList.cryptList.map((crypto, index) => {
                                return (
                                    <tr className="crypto-row" key={crypto.Code}>
                                        <th scope="row">{crypto.selected?<Star color="primary" onClick={()=>{this.select(crypto.Code)}}/>:<Star color="action" onClick={()=>{this.select(crypto.Code)}}/>}</th>
                                        <td><Icon className="d-inline-block"  i={crypto.Code} size={25}/> {crypto.Name}</td>
                                        <td>{crypto.Code.toUpperCase()}</td>
                                        <td>{crypto.Price}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}
export default QuickView;