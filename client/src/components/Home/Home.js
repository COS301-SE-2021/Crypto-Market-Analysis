import Menu  from './Menu/Menu';
import QuickView  from './QuickView/QuickView';
import Content from "./Content/Content";
import CryptoSelector from "./CryptoSelector/CryptoSelector";
import "bootstrap/dist/css/bootstrap.css";
import './Home.css';

function Home(){
    console.log("Triggered")
    return (
        <div className="home">
            <Menu/>
            <div className="container-fluid">
                <div className="row">
                    <QuickView/>
                    <Content/>
                    <CryptoSelector />
                </div>
            </div>
        </div>
    );
}

export default Home;