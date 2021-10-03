import React, { useState, useEffect}  from "react";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import HeaderStats from "./Headers/HeaderStats.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/styles/tailwind.css";
import AllCryptos from "../AllCrypto/AllCrypto.js";

function Home(){
    let [logged, setLogged] = useState(false)
    let [favObserver, setFavObserver] = useState(false) 
    let user = localStorage.getItem("emailSession")

    useEffect(()=>{
       if(user){
           setLogged(true)
       }else{setLogged(false)}
       
    },[user])

    /*
        Triggers headerstats component to refresh crypto cards
    */
    const alertObserver = ()=>{
        if(favObserver){
            setFavObserver(false)
        }
        else{
            setFavObserver(true)
        }
    }
    return (
        <React.Fragment>
           
            <Sidebar />
            <div className="md:ml-64" style={{fontFamily: 'Nunito'}}>
                <div className="container" >
                    <div className="row pb-5 pt-3" style={{backgroundColor:"rgba(203, 213, 225,0.7)"}}>
                        {
                            user !== null ? 
                            <div className="uppercase text-xl font-bold p-2 px-0" style={{color:"#58667e",margin:"auto"}}>
                                Cryptocurrencies you're following <hr/>
                                <div className="w-full uppercase text-xs font-bold px-0 mt-5 text-center" style={{color:"#58667e"}}>Click on a card to view more information</div>
                            </div>
                            :<div className="uppercase text-xl font-bold p-2 px-0" style={{color:"#58667e",margin:"auto"}}>Top 10 cryptocurrencies by market cap <hr/></div>
                        }
                        <HeaderStats ob={favObserver} logged={logged}/>
                    </div>
                    <div className="row pt-3" style={{backgroundColor:"rgba(218, 235, 225,0.22)"}}>
                        <div className="uppercase text-xl font-bold p-2 px-0" style={{display:"flex",color:"#58667e",margin:"auto"}}> Top 250 Cryptocurrencies<hr style={{borderColor:"white"}}/></div>
                        <div className="w-full uppercase text-xs font-bold px-0 text-center" style={{color:"#58667e"}}>Click on a star to add coin to your watchlist</div>
                        <div className="container" style={{display:"flex",color:"white",margin:"auto"}}>
                        <AllCryptos alert={alertObserver} logged={logged}/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home;