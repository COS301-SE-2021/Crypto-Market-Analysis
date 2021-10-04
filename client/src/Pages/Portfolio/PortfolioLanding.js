import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {CssBaseline, IconButton, Link} from "@material-ui/core";
import Headers from "../../components/Headers/Headers";
import image from "../../images/background.jpg"
import Features from "../../components/Features/Features";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button"

import PortfolioHeader from "./PortfolioHeader";
import PortfolioFeatures from "./PortfolioFeatures";
import PortfolioModal from "./PortfolioModal";

import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundSize: 'cover',
        minHeight: '100vh',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
    },
    container:{
        textAlign:'center',
        fontFamily: 'Nunito',
    },
}));

export default function PortfolioLanding() {
    const classes = useStyles();
    const [response, setResponse] = useState({});
    const history = useHistory();
    useEffect(() =>{
        let  portfolio_Req = {
            email: localStorage.getItem("emailSession"),
            coin_id: ""
        }

        axios.post('http://localhost:8080/user/getportfolio',portfolio_Req)
            .then((responseObj) => {

                console.log('this is the response')
                setResponse(responseObj.data);
                console.log(responseObj.data)
            })
    },[])
    return(
        <div >
            {/*{Object.keys(response).length ===  0 ? (*/}
                    <div className={classes.root}>
                        <CssBaseline />
                        <Sidebar />
                        <PortfolioHeader />
                    </div>
            // ) : (
            //     history.push("/Portfolios")
            // )}

            {/*<PortfolioFeatures />*/}

        </div>
    )

}