import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        backgroundColor:'#000000',
        display: 'inline-block',
        marginBottom: '2px',
        transform: 'scale(0.8)',
    }
  });
  


export default function BLM_Card(){

    
  const classes = useStyles();
    return (
            <Typography variant="h3" mx={2}>BLM </Typography>
    )
}