import "bootstrap/dist/css/bootstrap.css";

import Sidebar from "../../components/Sidebar/Sidebar.js";
import HeaderStats from "./Headers/HeaderStats.js";
import DetailedInfo from "../DetailedInfo/DetailedInfo"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/styles/tailwind.css";

function Home(){
    return (
        <>
        <Sidebar />
            <div className="md:ml-64  pt-4">
            {/* <HeaderStats /> */}
            <DetailedInfo />
        </div>
        </>
    );
}

export default Home;