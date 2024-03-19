import * as React from 'react';
import { Button,CssBaseline, Box, Typography, 
  Container, Link } from '@mui/material';
import { useEffect, useState, useContext, useReducer } from 'react';
import { PageTypeContext } from '../context/PageTypeContext'
import { SearchContext } from '../context/SearchContext'
import { useNavigate } from "react-router-dom";
import UserComponent from '../components/users/UserComponent';
import { UsersContext } from '../context/UserContext';
import { readQuery } from '../axios/AxiosFunctions'; 
import { useCurrentUserContext } from '../context/CurrentUserContext';

export default function debtHome() {
  const { currentUser } = useCurrentUserContext()
  const { pageType, setPageType } = useContext(PageTypeContext);
  const { users, setUsers } = useContext(UsersContext);
  const { query } = useContext(SearchContext);
  // const debtsPerPage = 6;

  useEffect(() => {
    readQuery('users')
    .then(response => setUsers(response))
  },[])

  return (
    <>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <UserComponent users={users} currentUser={currentUser}/>
        </Container>
      </main>
    </>
  );
}