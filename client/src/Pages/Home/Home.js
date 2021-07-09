import "bootstrap/dist/css/bootstrap.css";

import Sidebar from "../../components/Sidebar/Sidebar.js";
import HeaderStats from "./Headers/HeaderStats.js";
import DetailedInfo from "../DetailedInfo/DetailedInfo"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/styles/tailwind.css";
import AllCryptos from "../AllCrypto/AllCrypto.js";

function Home(){
    return (
        <>
            <Sidebar />
            <div className="md:ml-64 pt-4">
                <div className="container" >
                    <div className="row">
                        <div className="uppercase text-xl font-bold p-2 px-0" style={{color:"#58667e",margin:"auto"}}>Top Cryptocurrencies by market cap <hr/></div>
                        <HeaderStats />
                    </div>
                    <div className="row mt-32" style={{backgroundColor:"#58667e"}}>
                        <div className="uppercase text-xl font-bold p-2 px-0" style={{color:"white",margin:"auto"}}> All Cryptocurrencies<hr style={{borderColor:"white"}}/></div>
                        <div className="container">
                        <AllCryptos />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;