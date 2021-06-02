import "bootstrap/dist/css/bootstrap.css";
import {Icon} from "coinmarketcap-cryptocurrency-icons";
import {CheckCircle, CloseRounded, Search, Star} from "@material-ui/icons";

import React, {Component} from "react";
import "./PlatformSelector.css"

const cryptos = [{Name:"Twitter",id:"btc"},
    {Name:"Reddit",id:"ltc"},
    {Name:"Medium",id:"eth"},
    {Name:"Discord",id:"xrp"},
    {Name:"Socialplatform3",id:"usdt"}

];
class PlatformSelector extends React.Component{
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.state = {
            platformsList: [...cryptos.map(crypto =>{ return {...crypto,selected:false} })],
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
                };
                return {
                    ...crypt
                }
            })]
        });
        this.setState({faveList: [...newFavelist.map(crypto =>{ return {...crypto,selected:false} })]})
    }

    render()
    {
        const platList = this.state;

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
                            <th scope="col">Platform</th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            platList.platformsList.map((crypto, index) => {
                                return (
                                    <tr className="crypto-row" key={crypto.Code}>
                                        <th scope="row">{crypto.selected?<Star color="primary" onClick={()=>{this.select(crypto.Code)}}/>:<Star color="action" onClick={()=>{this.select(crypto.Code)}}/>}</th>
                                        <td>{crypto.Name}</td>

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
export default PlatformSelector;