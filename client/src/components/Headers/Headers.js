import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {AppBar, Collapse, IconButton, Toolbar} from "@material-ui/core";
import SortIcon from '@material-ui/icons/Sort'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Link as Scroll} from 'react-scroll'
import HomeIcon from '@material-ui/icons/Home'
import {Link} from "react-router-dom";


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
export default function Headers() {
    const classes = useStyles();
    const [checked, setChecked] = useState(false)
    useEffect(() =>{
        setChecked(true);
    },[])
    return(

        <div className={classes.root} id={"header"}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <h1 className={classes.appbarTitle} style={{color: "white"}}>
                        CRYPTOSIS
                    </h1>
                    <Link to="/home">
                        <IconButton >
                            <HomeIcon className={classes.icon}/>
                           Go to Homepage
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>

            <Collapse in={checked} {...(checked ? {timeout: 1000} : {})} collapsedHeight={50}>
                <div className={classes.container}>
                    <h1 className={classes.title}>
                        Welcome to the <br/> <span className={classes.colorText}>Cryptosis</span> Website.
                    </h1>

                    <h5>
                        Click below to view details about the main features of the website.
                    </h5>

                    <Scroll to={"to-place-to-visit"} smooth={true}>
                        <IconButton>
                            <ExpandMoreIcon className={classes.goDown}>
                            </ExpandMoreIcon>
                        </IconButton>
                    </Scroll>
                </div>
            </Collapse>
        </div>
    )
}