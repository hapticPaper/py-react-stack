import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from "react-redux";


import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NavDrawer from './components/NavDrawer'

import ControlHeader from './components/ControlHeader.js';
import { makeStyles } from '@material-ui/core/styles';

import './App.css'
import SocialFollow from "./components/SocialFollow"
import Fab from '@material-ui/core/Fab';
import {ROUTES} from './constants/routes'
import {refreshData} from './actions/index'

import BLM from "./components/BLM"

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    margin:0,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  mainViewport:{
    // marginTop: 50
    minHeight: '100vh',
    backgroundColor:"#c3d6ef",
  },
  fullwContainer: {
    // maxWidth: '100vh',
     minWidth:'100vw',
    // minHeight:'100vh',
    //paddingTop: '68px',
    margin:'0px',
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  bottomBar:{
    top: 'auto',
    bottom: 0,
    backgroundColor: '#0e1825'
  },
  blmB:{color:'#000000',
    margin: theme.spacing(1),},
  blm:{color:'#FFFFFF'},
  scrollingBody:{
    maxHeight: 200, 
    overflow: 'auto'},
  palette: {
      type: "dark",
    },
  headerFormat:{
      backgroundColor:"#F0F0F0",
  },
  h1:{
      fontSize: '4.75vmin',
      fontWeight: 600,
      paddingTop: 18,
      paddingBottom: 2

    }
}));

export default function App() {
  
  const route = useSelector(state=> state.route)
  const dispatch = useDispatch()
  const classes = useStyles();
  dispatch(refreshData('initial'))
  return (
    <div className={classes.root}>

        {/* <Container  className={classes.fullwContainer}> */}

        <Grid
            className={classes.fullwContainer}
            id="fullWithContainer"
            container
            item
            xs={12} sm={12} md={12} lg={12}
          >


<Grid container item id="c_header_grid_container"
            
            xs={12} sm={12} md={12} lg={12}>
            <ControlHeader id='dashHeader'>
            </ControlHeader>
          </Grid>
          {/* <Grid component item>{ROUTES[WeeklyTotals]}</Grid> */}

          <Grid container item 
            xs={12} sm={12} md={12} lg={12}
            alignItems="flex-start"
            id="mainViewPort"
            //style={scrollingBody}
            className={classes.mainViewport}
            >
              <Box width='100vw' mt={16}>

              {ROUTES[route].component}
              </Box>
          </Grid>

          <AppBar position="fixed" className={classes.bottomBar} id="footerBar">
          <Toolbar>
            <Grid 
              alignItems="flex-end" 
              container item xs={12} sm={12} md={12} lg={12} alignItems="flex-end" className="Social">
                <SocialFollow />
            </Grid>
            <Fab onClick={()=> window.open("https://www.vote.org/", "_blank")}
             className={classes.blmB}
            variant="extended"
          size="large"
          color="primary"
          >
            <Typography variant="h3" mx={2} className={classes.blm}>BLM</Typography>

          </Fab>
          </Toolbar>
        </AppBar>

        </Grid>
</div>

);
}
