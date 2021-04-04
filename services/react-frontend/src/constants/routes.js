import React from 'react'
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import BuildIcon from '@material-ui/icons/Build';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Bio from '../components/Bio'

import Welcome from '../components/Welcome'

export const DEFAULT_ROUTE = 'Taxpert';
export const ROUTES = { Taxpert:{  component:<Welcome/>,
                                            label: "Crypto Taxpert!!",
                                            route: "Home",
                                            icon: <HomeIcon/>},
                        Request:{   component:[<Typography variant="h2">Create Support Request (Coming Soon)</Typography>,
                                            <Typography variant="h4"> (Coming Soon)</Typography>],
                                    label: "Request Custom Work",
                                    route: "Send Custom Request",
                                    icon: <BuildIcon/>},
                        Bio:{component:<Bio/>,
                                label: "Ian Rubenstein",
                                route: "Bio",
                                icon: <PersonOutlineIcon/>},
                                
                    }