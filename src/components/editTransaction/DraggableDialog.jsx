import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios'
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { TextField, formLabelClasses } from '@mui/material';
import { DebtContext } from '../../context/DebtContext';
import { createQuery, updateQuery } from '../../axios/AxiosFunctions';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props) {
  const [open, setOpen] = useState(props.edit);
  const payment = { 'userID': props.debt.userID, 'debtID': props.debt.id, 'amount': props.amount }
  const debt = { 'id': props.debt.id, 'amount': props.debt.amount - props.amount, 'paid': props.debt.amount === props.amount? true : false }

  const addPayment = () => {
    const pay = { 'userID': props.debt.userID, 'debtID': props.debt.id, 'amount': props.amount }
    console.log(pay)
    const axdebts = `http://localhost:8063/api/payments/createQuery`
    axios.post(axdebts, pay)
        .then(response => { 
            console.log(response.data.data);
         })
        .catch(error => { console.log(error) })
    editPayment()
}

const editPayment = () => {
    const pay = { 'amount': parseInt(props.debt.amount - props.amount) }
    const axdebts = `http://localhost:8063/api/debts/put/${props.debt.id}`
    axios.put(axdebts, pay)
        .then(response => { 
            console.log(response.data.data);
         })
        .catch(error => { console.log(error) })
        props.getUsers(props.debt.userID, props.amount)
    handleClose()
}

  const handleClose = () => {
    setOpen(false);
    props.amount === props.debt.amount
        ?props.debtPaid(props.debt.id, props.debt.userID, props.debt.amount)
        :null
        props.setEdit(false)
    };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Add Payment
        </DialogTitle>
        <DialogContent>
            <br />
        <TextField
            type="number"
            onChange={(e) => props.setAmount(parseInt(e.target.value))}
            label="Payment Amount"
        />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{'&&:focus': {outline: 'none'}}}>
            Cancel
          </Button>
          <Button onClick={ () => { 
            createQuery('payments', payment)
            .then(()=> updateQuery('debts', debt))
            // .then(()=> updateQuery('users', pay)) 
          }
            // addPayment
          }
            sx={{'&&:focus': {outline: 'none'}}}>
                Submit
            </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}