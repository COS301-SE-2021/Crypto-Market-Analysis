import Menu  from './Menu/Menu';
import QuickView  from './QuickView/QuickView';
import PlatformSelector  from './PlatformSelector/PlatformSelector';
import Sidebar from "./Sidebar/Sidebar.js";
import HeaderStats from "./Headers/HeaderStats.js";
import Content from "./Content/Content";
import "bootstrap/dist/css/bootstrap.css";
// import './Home.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/styles/tailwind.css";

function Home(){
    console.log("Triggered")
    return (
        <>
        <Sidebar />
        <div className="w-full md:ml-64 bg-blueGray-100">
        {/* <AdminNavbar /> */}
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
            {/* <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/tables" exact component={Tables} />
            <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
            <FooterAdmin /> */}
        </div>
        </div>
        </>
    );
}

export default Home;