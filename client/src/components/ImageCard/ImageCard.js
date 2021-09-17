import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Button, CardActionArea, CardActions, Collapse} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    root: {
        maxWidth: 445,
        background:'rgba(0,0,0,0.5)',
        margin:'10px'
    },
    media:{
        height: 340,
    },
    title:{
        fontFamily:'Nunito',
        fontWeight:'bold',
        fontSize:'2rem',
        color:'white'
    },
    description:{
        fontFamily:'Nunito',
        fontSize:'1rem',
        color:'#ddd'
    }
});

export default function ImageCard({ place, checked }) {
    const classes = useStyles();
    return (
        <Collapse in={checked} {...(checked ? {timeout: 1000} : {})}>
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    component="img"
                    height="140"
                    image={place.imageUrl}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h1"
                        className={classes.title}
                    >
                        {place.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className={classes.description}>
                        {place.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </Collapse>
    );
}
