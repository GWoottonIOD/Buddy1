import * as React from 'react';
import { CssBaseline, Container } from '@mui/material';
import { useEffect, useContext } from 'react';
import { DebtContext } from '../context/DebtContext';
import { PageTypeContext } from '../context/PageTypeContext'
import { SearchContext } from '../context/SearchContext'
import FilterComponent from '../components/transactions/FilterComponent';
import { readQuery } from '../axios/AxiosFunctions';
import { useCurrentUserContext } from '../context/CurrentUserContext';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function debtHome() {
  const { setPageType } = useContext(PageTypeContext);
  const { currentUser } = useCurrentUserContext()
  const { debts, setDebts } = useContext(DebtContext);
  const { users, setUsers } = useUserContext()
  const { query } = useContext(SearchContext);
  const navigate = useNavigate();
  // const debtsPerPage = 6;

  // //get the unpaid debts
  useEffect(() => {
    currentUser.username ? null : navigate('/login')
    readQuery('users').then(response => setUsers(response))
    query.query==='' 
      ? readQuery('debts').then(response => setDebts(response))
      : readQuery('debts', query.query, 'userdebts').then(response => setDebts(response))
    setPageType('debts')
}, [query.query, currentUser])

  return (
    <>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {currentUser 
            ?<FilterComponent debts={debts} 
            currentUser={currentUser} users={users}/>
            :null}
        </Container>
      </main>
      </>
  );
}