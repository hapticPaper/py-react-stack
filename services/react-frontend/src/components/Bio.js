
import React  from "react"
import { Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    h4:{fontSize:'1.8rem'},
    h3:{fontSize:'2.125rem'},
    b:{fontSize:'0.9rem'},

}));


export default function Bio()  {

    const classes = useStyles()
    return (
        <Grid mx={2}>
            <Box mx={5}>


            <Typography variant="h4" className={classes.h4}>Intro:</Typography>
            <Typography variant="body1"  className={classes.b}>Ian has been exposed to tech since a very young age, and gravitated to it. He remembers his first mp3 download ("What's my age again?") and even connecting the 3.5mm to the RCA connectors on his classic 90's stero to get the song onto a <b>casette</b>!</Typography>
            <Typography variant="body1"   className={classes.b}>Since those early days, he acquired a few degrees along the way, and absorbed everything he was exposed to professionally - from SQL to Machine Learning to Kubernetes clusters in public clouds (GCP, Azure, AWS) for streaming processing (Kafka) - in several domains: traditional SaaS, Advertising, and Financial Management companies.</Typography>
            <Typography variant="body1"   className={classes.b}>His love of Tech and empathy for others needs allows Ian to deeply understand what is needed (and what isn't) and how to deliver it. Now Ian work's full-time for a large asset manager, and teaches programming boot camps.</Typography>
            
            <hr></hr>
            
            <Typography variant="h4" className={classes.h4}>More coming soon...</Typography>
            </Box>
        </Grid>
        ) 


}