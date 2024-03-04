import React, {useState, useContext} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField } from '@mui/material/';
import Draggable from 'react-draggable';
import { DebtContext } from '../../context/DebtContext';
import { createQuery, updateQuery, readQuery } from '../../axios/AxiosFunctions';

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
  const { setDebts, debts } = useContext(DebtContext);
  const payment = { userID: props.debt.userID, debtID: props.debt.id, amount: props.amount }
  const debt = { id: props.debt.id, amount: props.debt.amount - props.amount, paid: props.debt.amount === props.amount? true : false }

  const handleClose = () => {
    setOpen(false);
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
            .then(()=> readQuery('users', props.debt.userID))
            .then(response=> updateQuery('users', 
              {id: props.debt.userID, total: response[0].total - props.amount}))
            .then(()=> readQuery('debts'))
            .then((response)=> setDebts(response))
            .then(handleClose) 
          }
          }
            sx={{'&&:focus': {outline: 'none'}}}>
                Submit
            </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}