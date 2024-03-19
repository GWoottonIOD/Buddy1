import React from 'react'
import { Box } from '@mui/material'
import Page from '../components/newUser/Page';

export const NewUser = () => {
    return (
        <div className="plantInfo">
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 15,
                    pb: 4,
                }}
            ></Box>
            <form>
                <div>Add a User</div>
                <br />
                <Page/>
            </form>
        </div>
    )
}
