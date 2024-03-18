import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useNavigate } from "react-router-dom";
import GetUser from '../components/newTransaction/GetUser';
import { readQuery } from '../axios/AxiosFunctions'; 
import Inputs from '../components/newTransaction/Inputs';
import { useCurrentUserContext } from '../context/CurrentUserContext';

export const UserNew = () => {
    const { currentUser } = useCurrentUserContext()
    const [user, setUser] = useState(false);
    let navigate = useNavigate();

    //if a non user is trying to gain access, this will redirect them.
    const doNotProceed = () => {
        if (currentUser === null) {
            navigate('/pna');
        }
    }
    doNotProceed()

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
                <div>{user?userObj.name:"Add a transaction"}</div>
                <br/>
                {users.length!==0?<GetUser setUser={setUser} users={users} setUserId={setUserId}/>: null}
                <br/>
                {user?<Inputs user={user} userId={userId}/>: null}
            </form>
        </div>
    )
}
