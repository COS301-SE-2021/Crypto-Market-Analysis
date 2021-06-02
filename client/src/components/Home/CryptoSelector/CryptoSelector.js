// import "bootstrap/dist/css/bootstrap.css";
// import {Icon} from "coinmarketcap-cryptocurrency-icons";
// import {CheckCircle, CloseRounded} from "@material-ui/icons";
//
// import React, {Component} from "react";
// import "./CryptoSelector.css"
//
// const cryptos = [{Name:"Bitcoin",Code:"btc"},
//     {Name:"Litecoin",Code:"ltc"},
//     {Name:"Etherium",Code:"eth"},
//     {Name:"Ripple",Code:"xrp"},
//     {Name:"Tether",Code:"usdt"}
//
//     ];
// class Selector extends React.Component{
//     constructor(props) {
//         super(props);
//     this.select = this.select.bind(this);
//     this.state = {
//             cryptList: [...cryptos.map(crypto =>{ return {...crypto,selected:false} })],
//             j:[]
//         };
//     }
//     select(index){
//         this.setState({
//             cryptList: [...this.state.cryptList.map((crypt,currIndex)=>{
//                 if(index==currIndex){
//                     crypt.selected = !crypt.selected;
//                 };
//                 return {
//                     ...crypt
//                 }
//             })]
//         });
//     }
//
//     render() {
//         const cryptoList = this.state;
//         console.log(cryptoList);
//         return(
//             <div className="container">
//                 <div className="nav-header">
//                     <nav className="navbar bg-light justify-content-between">
//                         <span className="navbar-brand navbar-brand-centered">AppName</span>
//                         <ul className="navbar-nav">
//                             <li className="nav-item">
//                                 <CloseRounded/>{/*Add a button for option when account is clicked*/}
//                             </li>
//                         </ul>
//                     </nav>
//                 </div>
//
//                 <div className="row">
//
//                     {
//                         cryptoList.cryptList.map((crypto,index) => {
//                             return(
//                                 <div key={crypto.Code} className="col-md-4" onClick={()=>{this.select(index)}}>
//                                     <div className="card crypto-card">
//                                         <div className="card-body"  >
//                                             <Icon className="d-inline-block"  i={crypto.Code} size={45}/>
//                                             <h5 className="d-inline"> {crypto.Name} </h5>
//                                             {crypto.selected && <CheckCircle className="d-inline-block float-right"/>}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//                 {cryptoList.ttoggle && <span>Yes</span>}
//             </div>
//         )
//     }
// }
// export default Selector;