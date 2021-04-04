import React from 'react'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function Welcome(){
    return (
    <Container>
    <Typography variant="h4">Offering a variety of consulting services. All services offered on a sliding scale.</Typography>
        <Typography variant="h5">Here is a non-exhaustive list of some:<br/>Web Development<br/>Hardware Purchase and Setup</Typography>
    </Container>)
}