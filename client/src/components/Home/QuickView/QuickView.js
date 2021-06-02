import "bootstrap/dist/css/bootstrap.css";
import "./QuickView.css"
import {Search} from "@material-ui/icons";

function QuickView()
{
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
                        <th scope="col">Name</th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Bitcoin</td>
                        <td>BTC</td>
                        <td>R</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Etherium</td>
                        <td>ETH</td>
                        <td>R</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Litecoin</td>
                        <td>LTC</td>
                        <td>R</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>Bitcoin</td>
                        <td>BTC</td>
                        <td>R</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Etherium</td>
                        <td>ETH</td>
                        <td>R</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Litecoin</td>
                        <td>LTC</td>
                        <td>R</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default QuickView;