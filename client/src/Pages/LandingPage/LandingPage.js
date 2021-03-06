import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {CssBaseline} from "@material-ui/core";
import Headers from "../../components/Headers/Headers";
import image from "../../images/background.jpg"
import Features from "../../components/Features/Features";

const useStyles = makeStyles(() => ({
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
export default function LandingPage() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <CssBaseline />
            <Headers />
            <Features />
        </div>
    )

}