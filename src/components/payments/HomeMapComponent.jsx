import React from 'react'
import {
     Card, CardActions, CardContent, Grid, Typography
} from '@mui/material';
import OverdueComponent from './OverdueComponent';
import PaidComponent from './PaidComponent';
import PaidDeleteComponent from './PaidDeleteComponent';

export default function HomeMapComponent(props) {
    return (
        <div>
            <Grid container spacing={4}>
                {props.payments.map((debt, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardContent sx={{ flexGrow: 2 }}>
                                {props.currentUser && props.currentUser.UserAdmin ?
                                    <Typography gutterBottom variant="h5" component="h2" className='capitalise'>
                                        {props.users.filter((user) => user.id === debt?.userID)[0].name}
                                    </Typography> : null}
                                <Typography>
                                    ${debt.amount}
                                </Typography>
                                 <Typography>
                                    Paid: <br/>
                                    {debt.createdAt.slice(0, 10)}<br/>
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
                                 {props.currentUser && props.currentUser.UserAdmin ?<PaidDeleteComponent debt={debt} currentUser={props.currentUser}/> : null }
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}