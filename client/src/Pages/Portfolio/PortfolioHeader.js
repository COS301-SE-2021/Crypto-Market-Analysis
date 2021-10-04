import { makeStyles } from '@material-ui/core/styles'
import {AppBar, Button, Collapse, CssBaseline, IconButton, Toolbar} from "@material-ui/core";
import SortIcon from '@material-ui/icons/Sort'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Link as Scroll} from 'react-scroll'
import HomeIcon from '@material-ui/icons/Home'
import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import PortfolioModal from "./PortfolioModal";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh',
        fontFamily:'Nunito'
    },
    appbar:{
        background:"black",
        fontFamily: 'Nunito',
    },
    appbarTitle:{
        flexGrow: '1',
    },
    appbarWrapper:{
        width:'80%',
        margin:'0 auto',
    },
    icon:{
        color:"white",
        fontSize:"2rem",
    },
    colorText:{
        color: 'black'
    },
    container:{
        textAlign:'center'
    },
    title:{
        color:'black',
        fontSize: '4.5rem'
    },
    goDown:{
        color:'green',
        fontSize:'3em',
    }
}));
export default function PortfolioHeader() {
    const [checked, setChecked] = useState(false);
    const classes = useStyles();

    useEffect(() =>{
        setChecked(true);
    },[])
    return(

        <div className={classes.root} id={"header"}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <h1 className={classes.appbarTitle} style={{color: "white"}}>
                        Portfolio
                    </h1>

                </Toolbar>
            </AppBar>

            <Collapse in={checked} {...(checked ? {timeout: 1000} : {})} collapsedHeight={50}>
                <div className={classes.container}>

                    <h1 className={classes.title}>
                        Cryptosis <br/> <span className={classes.colorText}>Portfolio Tracker</span>
                    </h1>

                    <h5>
                        Keep track of the market price changes, your losses, your gains and portfolio valuation here.
                    </h5>

                    <Button variant={'contained'} style={{
                        textAlign: "center",
                        backgroundColor: "blue",
                        color:"#FFFFF0",
                        padding: "5px 15px",
                        borderRadius: "5px",
                        outline: "5px",
                        width: "40%",
                    }} href={"/portfolios"}>
                        Create portfolio
                    </Button>



                </div>
            </Collapse>
        </div>
    )
}