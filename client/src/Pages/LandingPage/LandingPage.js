import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {CssBaseline, IconButton, Link} from "@material-ui/core";
import Headers from "../../components/Headers/Headers";
import image from "../../images/background.jpg"
import Features from "../../components/Features/Features";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Button} from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";

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
export default function LandingPage() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <CssBaseline />
            <Headers />
            <Features />

            <div className={classes.container}>
                <h3>

                    <Button variant={'contained'} style={{
                        textAlign: "center",
                        backgroundColor: "#58667e",
                        color:"#FFFFF0",
                        padding: "5px 15px",
                        borderRadius: "5px",
                        outline: "5px",
                        width: "50%",
                    }} href={"/login"} startIcon={<DeleteIcon />}>
                        Visit HomePage.
                    </Button>

                </h3>
            </div>

        </div>
    )

}