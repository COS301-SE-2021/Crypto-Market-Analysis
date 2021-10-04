import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {CssBaseline} from "@material-ui/core";
import Headers from "../../components/Headers/Headers";
import image from "../../images/background.jpg"
import ImageCard from "../ImageCard/ImageCard";
import place from "../../static/pages"
import useWindowPosition from "../../hook/useWindowPosition";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    roots: {
        minHeight: '100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        [theme.breakpoints.down("md")]:{
            flexDirection:'column',
        }
    },
    root:{
            minHeight: '100vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',

    }
}));
export default function Features() {
    const classes = useStyles();
    const checked = useWindowPosition('header')
    return(
        <div>
            <div className={classes.root} id={"to-place-to-visit"}>
                <Link to={{pathname:"/home"}}> <ImageCard place={place[0]} checked={checked}/> </Link>
                <Link to={{pathname:"/home"}}> <ImageCard place={place[3]} checked={checked}/> </Link>
            </div>

            <div className={classes.roots} id={"to-place-to-visit"}>
                <Link to={{pathname:"/home"}}> <ImageCard place={place[2]} checked={checked}/> </Link>
                <Link to={{pathname:"/home"}}> <ImageCard place={place[1]} checked={checked}/> </Link>
            </div>
        </div>


    )

}