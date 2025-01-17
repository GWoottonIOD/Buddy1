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
import { PaymentContext } from '../context/PaymentContext';

export default function PaymentHome() {
  const { setPageType } = useContext(PageTypeContext);
  const { currentUser } = useCurrentUserContext()
  const { payments, setPayments } = useContext(PaymentContext);
  const { debts, setDebts } = useContext(DebtContext);
  const { users, setUsers } = useUserContext()
  const { query } = useContext(SearchContext);
  const navigate = useNavigate();
  // const paymentsPerPage = 6;

  // //get the unpaid payments
  useEffect(() => {
    currentUser.username ? null : navigate('/login')
    readQuery('users').then(response => setUsers(response))
    query.query==='' 
      ? readQuery('payments').then(response => console.log(response))
      : readQuery('payments', query.query, 'userpayments').then(response => setPayments(response))
    setPageType('payments')
}, [query.query, currentUser])

  return (
    <>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {currentUser 
            ?<FilterComponent payments={payments} debts={payments}
            currentUser={currentUser} users={users}/>
            :null}
        </Container>
      </main>
      </>
  );
}