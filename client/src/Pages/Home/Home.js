
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import HeaderStats from "./Headers/HeaderStats.js";
import DetailedInfo from "../DetailedInfo/DetailedInfo"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/styles/tailwind.css";
import AllCryptos from "../AllCrypto/AllCrypto.js";

function Home(){

    let user = localStorage.getItem("emailSession")
    return (
        <>
            <Sidebar />
            <div className="md:ml-64">
                <div className="container" >
                    <div className="row pb-5 pt-3" style={{backgroundColor:"#cbd5e1"}}>
                        {
                            user !== null ? <div className="uppercase text-xl font-bold p-2 px-0" style={{color:"#58667e",margin:"auto"}}>Cryptocurrencies you're following <hr/></div>
                            :<div className="uppercase text-xl font-bold p-2 px-0" style={{color:"#58667e",margin:"auto"}}>Top Cryptocurrencies by market cap <hr/></div>
                        }
                        <HeaderStats />
                    </div>
                    {/* {
                        user !== null? <div className="row py-5" style={{backgroundColor:"#fff"}}>
                                            <div className="uppercase text-xl font-bold p-2 px-0" style={{color:"#58667e",margin:"auto"}}>Average Sentimental graph <hr/></div>
                                            <HeaderStats /> 
                                        </div> : <></>
                    } */}
                    <div className="row pt-3" style={{backgroundColor:"#23292f",color:"white"}}>
                        <div className="uppercase text-xl font-bold p-2 px-0" style={{display:"flex",color:"white",margin:"auto"}}> All Cryptocurrencies<hr style={{borderColor:"white"}}/></div>
                        <div className="container" style={{display:"flex",color:"white",margin:"auto"}}>
                        <AllCryptos />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;