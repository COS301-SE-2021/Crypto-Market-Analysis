import Menu  from './Menu/Menu';
import QuickView  from './QuickView/QuickView';
import Content from "./Content/Content";
import PlatformSelector from "./PlatformSelector/PlatformSelector";
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
                    <PlatformSelector />
                </div>
            </div>
        </div>
    );
}

export default Home;