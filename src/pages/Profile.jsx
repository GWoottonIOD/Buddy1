import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Box } from '@mui/material'
import { useNavigate } from "react-router-dom";
import Page from '../components/profile/Page';
import { readQuery } from '../axios/AxiosFunctions';

export default function Profile() {
  let navigate = useNavigate();
  const [user, setUser] = useState({})

  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  // state and useeffect

  //gets user profile
  useEffect(() => {
    readQuery('users', currentUser.id)
    .then(response => {
        setUser(response[0])
    })
  },[currentUser.id])

  // logs user out
  const loggingOff = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  }
  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 15,
          pb: 4,
        }}
      >
        <Button onClick={loggingOff}>Log out</Button>
        <Page currentUser={currentUser} />
      </Box>
    </>
  )
}

