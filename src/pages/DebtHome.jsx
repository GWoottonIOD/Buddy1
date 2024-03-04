import * as React from 'react';
import { CssBaseline, Container } from '@mui/material';
import { useEffect, useContext } from 'react';
import { useAxios } from '../hooks/useAxios';
import { DebtContext } from '../context/DebtContext';
import { PageTypeContext } from '../context/PageTypeContext'
import { SearchContext } from '../context/SearchContext'
import FilterComponent from '../components/transactions/FilterComponent';
import { createQuery, updateQuery, readQuery } from '../axios/AxiosFunctions';
import Axios from '../axios/Axios';

export default function debtHome() {
  const { pageType, setPageType } = useContext(PageTypeContext);
  const { debts, setDebts } = useContext(DebtContext);
  const { query } = useContext(SearchContext);
  // const debtsPerPage = 6;
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);

  // //get the unpaid debts
  useEffect(() => {
    readQuery('debts')
    .then(response => setDebts(response))
    setPageType('debts')
}, [query])

  return (
    <>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {currentUser ?<FilterComponent debts={debts} currentUser={currentUser}/>:null}
        </Container>
      </main>
      </>
  );
}