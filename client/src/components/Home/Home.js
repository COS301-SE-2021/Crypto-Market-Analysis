import Menu  from './Menu/Menu';
import QuickView  from './QuickView/QuickView';
import Content from "./Content/Content";
import "bootstrap/dist/css/bootstrap.css";
import './Home.css';

function Home(){
    return (
        <div className="home">
            <Menu/>
            <div className="container-fluid">
                <div className="row">
                    <QuickView/>
                    <Content/>
                </div>
            </div>
        </div>
    );
}

export default Home;