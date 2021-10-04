import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {CssBaseline} from "@material-ui/core";
import Headers from "../../components/Headers/Headers";
import image from "../../images/background.jpg"
import ImageCard from "../../components/ImageCard/ImageCard";
import places from "../../static/portfolioPages"
import useWindowPosition from "../../hook/useWindowPosition";

const useStyles = makeStyles((theme) => ({
    roots: {
        minHeight: '100vh',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'space-evenly',
        [theme.breakpoints.down("md")]:{
            flexDirection:'column',
        },
        textAlign:"center"
    },
    root:{
        minHeight: '100vh',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        textAlign:"center"
    }
}));
export default function PortfolioFeatures() {
    const classes = useStyles();
    const checked = useWindowPosition('header')
    return(
        <div>
            <div className={classes.root} id={"to-place-to-visit"}>
                <ImageCard place={places[0]} checked={checked}/>
            </div>

            <div className={classes.roots} id={"to-place-to-visit"}>
                <ImageCard place={places[2]} checked={checked}/>
                <ImageCard place={places[1]} checked={checked}/>
            </div>
        </div>


    )

}