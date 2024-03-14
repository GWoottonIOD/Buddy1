import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, TextField, Typography, Box } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { readQuery, updateQuery } from '../axios/AxiosFunctions';


export const UserInfoEdit = () => {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    const [user, setUser] = useState({});
    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const [password, setPassword] = useState('')
    const [vPassword, setVPassword] = useState('')
    const [total, setTotal] = useState(user.total)

    useEffect(() => {
        readQuery('users', userid)
        .then(response => {
            setUser(response[0])
            setName(response[0].name)
            setUsername(response[0].username)
            setPassword(response[0].password)
            setTotal(response[0].total)})
      },[])

    const params = useParams();
    const userid = params.id

    let navigate = useNavigate();

    //if a non admin is trying to gain access, this will stop it.
    const doNotProceed = () => {
        if (currentUser === null || currentUser.UserAdmin === 0) {
            navigate('/pna');
        }
    }
    //description field - make more user friendly
    doNotProceed()

    const updateUser = { 'name': name, 'total': total, 'username': username, 'password': password }
    console.log(name)
return (
    <div className="userInfo">
        {userid ?
            <>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 15,
                        pb: 4,
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        color="text.secondary"
                        component="p"
                    >
                        User ID: {userid}<br /><br />
                        Currently owes: ${user.total}
                    </Typography>
                    <form><br></br>
                        <div><TextField type='number' key={user.total} onChange={e => setTotal(e.target.value)} defaultValue={user.total} label="Change total owed"></TextField></div><br></br>
                        <div><TextField type='text' key={user.name} onChange={e => setName(e.target.value)} defaultValue={user.name} label="First Name"></TextField></div><br></br>
                        <div><TextField type='text' key={user.username} onChange={e => setUsername(e.target.value)} defaultValue={user.username} label="Username"></TextField></div><br></br>
                        {/* <div><TextField type='password' onChange={e => setPassword(e.target.value)} label="Password"></TextField></div><br></br> */}
                            {/* <div><TextField type='password' onChange={e => setVPassword(e.target.value)} label="Password"></TextField></div><br></br> */}
                        <Button onClick={() => setPassword('')}>Reset Password</Button><br />
                        <Button onClick={() => { 
                            updateQuery('users', updateUser)
                            .then(navigate('/users'))
                        }
                            }>
                            Update
                        </Button>
                    </form>
                </Box>
            </>
            : <p> User: {userid} not found</p>
        }
    </div>
)
}
