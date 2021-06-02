import "bootstrap/dist/css/bootstrap.css";
import "./PlatformSelector.css"
import {Search, Star} from "@material-ui/icons";
import React from "react";
import { SocialIcon } from 'react-social-icons';


const platforms = [{Name:"Twitter",id:"twitter"},
    {Name:"Reddit",id:"reddit"},
    {Name:"Medium",id:"medium"},
    {Name:"Discord",id:"discord"}
];

class PlatformSelector extends React.Component{
    constructor(props) {
        super(props);
        this.selectPlatform = this.selectPlatform.bind(this);
        this.state = {
           platformsList: [...platforms.map(crypto =>{ return {...crypto,selected:false} })],
            faveList:[]
        };
    }
    selectPlatform(id){
        let newScrapelist = this.state.faveList;

        this.setState({
            platformsList: [...this.state.platformsList.map((platform,currIndex)=>{
                if(id==platform.id){
                    platform.selected = !platform.selected;

                    //if selected add to favourite list else remove it
                    if(platform.selected){newScrapelist.push(platform)}
                    else{newScrapelist = newScrapelist.filter((item) => item.id !== id);}
                }
                return {
                    ...platform
                }
            })]
        })
        this.setState({faveList: [...newScrapelist.map(item =>{ return {...item} })]})
    }

    render()
    {
        const currState = this.state;

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
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            currState.platformsList.map((item, index) => {
                                return (
                                    <tr className="crypto-row" key={item.id}>
                                        <th scope="row">{item.selected?<Star color="primary" onClick={()=>{this.selectPlatform(item.id)}}/>:<Star color="action" onClick={()=>{this.selectPlatform(item.id)}}/>}</th>
                                        <td><SocialIcon network={item.id} style={{height:"40px",width:"40px"}}/></td>
                                        <td>{item.Name}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}
export default PlatformSelector;