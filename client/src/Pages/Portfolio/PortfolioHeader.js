import { makeStyles } from '@material-ui/core/styles'
import {AppBar, Button, Collapse,Toolbar} from "@material-ui/core";
import React, {useEffect, useState} from 'react';

const useStyles = makeStyles(() => ({
    root:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
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
        color: 'black',
        width:"81.25%"
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