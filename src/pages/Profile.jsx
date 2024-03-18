import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Box } from '@mui/material'
import { useNavigate } from "react-router-dom";
import Page from '../components/profile/Page';
import { readQuery } from '../axios/AxiosFunctions';
import { useCurrentUserContext } from '../context/CurrentUserContext';

export default function Profile() {
  let navigate = useNavigate();
  const [user, setUser] = useState({})
  const { currentUser, handleUser } = useCurrentUserContext()

  //gets user profile
  useEffect(() => {
    readQuery('users', currentUser.id)
    .then(response => {
        setUser(response[0])
    })
  },[currentUser.id])

  // logs user out
  const loggingOff = () => {
    handleUser({})
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

