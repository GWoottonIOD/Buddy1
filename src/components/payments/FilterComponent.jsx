import * as React from 'react';
import {
  Button, CssBaseline, Box, Typography,
  Container, Link
} from '@mui/material';
import { useEffect, useState } from 'react';
import DebtPages from '../DebtPages';
import HomeMapComponent from './HomeMapComponent';
import RefreshIcon from '@mui/icons-material/Refresh';
import DateChange from './DateChange';

export default function FilterComponent(props) {
  const [filter, setFilter] = useState([])
  const [dueDate, setDueDate] = useState(null);
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1);

  const payments = props.payments
  const currentUser = props.currentUser

  const isPaidOnTheSameDay = (payments) => {
    const uniqueDates = new Set();
    const uniquePayments = [];
    const duplicateAdditions = new Set()
    const duplicatePayments = []

    payments.forEach(element => {
      const date = element.createdAt.slice(0, 10); //cut the string
      if (uniqueDates.has(`${date}:${element?.userID}`)) { // check if the date is already in the set with the assigned username
        duplicateAdditions.add(`${date}:${element?.userID}`); //add the date with username to the set
        if(!duplicatePayments[uniquePayments[uniquePayments.length - 1]] || !duplicatePayments.includes(element)){
          duplicatePayments.push(uniquePayments[uniquePayments.length - 1]);// must check double ups
        }
        duplicatePayments.push(element);
        console.log(duplicatePayments)
        const correctedPayment = {
          id: element.id,
          userID: element.userID,
          debtID: element.debtID,
          amount: getTotal(duplicatePayments),
          updatedAt: element.updatedAt,
          createdAt: element.createdAt,
        }
        uniquePayments.pop()
        uniquePayments.push(correctedPayment)
        console.log("duplicateAdditions", duplicateAdditions)
      }
       else {
        if (!uniqueDates.has(`${date}:${element?.userID}`)) {
          duplicatePayments.length = 0
          uniqueDates.add(`${date}:${element?.userID}`);
          uniquePayments.push(element);
          console.log("uniqueDates", uniqueDates)
      }
    }
  });
    reverseDateOrder(uniquePayments)
  }

  const reverseDateOrder = (response) => {
    const filteredPayments = response.reverse((payment) => payment.createdAt)
    console.log(filteredPayments)
    setFilter(filteredPayments)
    setTotal(getTotal(filteredPayments))
  }

  const FilterByThisDate = () => {
    const dateStringConvert = dueDate.toISOString().slice(0, 10)
    const numConversion = Number(dateStringConvert.slice(8, 10)) + 1
    const correctDate = `${dateStringConvert.slice(0, 4)}-${dateStringConvert.slice(5, 7)}-${numConversion < 10 ? `0${numConversion}` : numConversion}`
    const filteredArray = payments.filter((payment) => payment.createdAt.slice(0, 10) === correctDate)
    isPaidOnTheSameDay(filteredArray)
  }

  const getTotal = (payments) => {
    const amountArray = payments.map(({ amount }) => ({ amount }))
    const sum = amountArray.reduce((acc, curr) => acc + curr.amount, 0);
    console.log(sum)
    return sum
  }

  useEffect(() => {
    dueDate
      ? FilterByThisDate(dueDate)
      : isPaidOnTheSameDay(payments)
  }, [payments, dueDate])

  return (
    <>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Typography
            component="h1"
            variant="h6"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {currentUser.UserAdmin ? <div>Payments </div> : <div>Payments for {currentUser.name}<br /></div>}
            <div>Amounts paid: ${total}</div>
            <DateChange setDueDate={setDueDate} />
            {/* {currentUser && currentUser.UserAdmin ? <div><Button variant="outlined" id="buttonWhite" size="small" href={"/debtnew/"} sx={{ ":hover": { color: '#4A8E51' } }}>Add a debt</Button></div> : null} */}
            {/* {currentUser && currentUser.UserAdmin && isPaid ? <Button variant="outlined" id="buttonWhite" size="small" onClick={() => filterUnpaid(debts)}>Unpaid</Button> : <Button variant="outlined" id="buttonWhite" size="small" onClick={filterPaid}>Paid</Button>} */}
            <div><Button variant="outlined" id="buttonWhite" size="small"><RefreshIcon onClick={() => isPaidOnTheSameDay(payments) && setDueDate(null)} /></Button></div>
          </Typography>
          <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer"></Box>
          <HomeMapComponent payments={filter} currentUser={currentUser} users={props.users} />
        </Container>
      </main>
      <Typography variant="h6" align="center" gutterBottom>
        <DebtPages pageHandler={setPage} list={filter.length} />
      </Typography>
    </>
  )
}

