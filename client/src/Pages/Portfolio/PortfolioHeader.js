import { makeStyles } from '@material-ui/core/styles'
import {AppBar, Button, Collapse, CssBaseline, IconButton, Toolbar} from "@material-ui/core";
import SortIcon from '@material-ui/icons/Sort'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Link as Scroll} from 'react-scroll'
import HomeIcon from '@material-ui/icons/Home'
import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import PortfolioModal from "./PortfolioModal";

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        height:'100vh',
        fontFamily:'Nunito',
        textAlign:"center"
    },
    appbar:{
        background:"black",
        fontFamily: 'Nunito',
        width:"81.25%"
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
        textAlign:'center',
        width:"81.25%"
    },
    title:{
        color:'black',
        fontSize: '4.5rem',
        textAlign:"center"
    },
    goDown:{
        color:'green',
        fontSize:'3em',
        position:"inherit"
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
                        top:"0px"
                    }} href={"/portfolio"} className={'btn-modal'}>
                        Create portfolio
                    </Button>

                    <Scroll to={"to-place-to-visit"} smooth={true}>
                        <IconButton style={{position:"absolute",display:"block", top:"100%", right:"33%"}}>
                            <ExpandMoreIcon className={classes.goDown}>
                            </ExpandMoreIcon>
                        </IconButton>
                    </Scroll>

                </div>
            </Collapse>
        </div>
    )
}