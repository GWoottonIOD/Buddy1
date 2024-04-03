import React, {useState, useContext} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle,
   Paper, TextField } from '@mui/material/';
import Draggable from 'react-draggable';
import DateChange from '../newTransaction/DateChange';
import { DebtContext } from '../../context/DebtContext';
import { createQuery, updateQuery, readQuery } from '../../axios/AxiosFunctions';
import { useSearchContext } from '../../context/SearchContext';

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
  const [dueDate, setDueDate] = useState(props.debt.duedate);
  const { debts, setDebts } = useContext(DebtContext);
  const { query } = useSearchContext()
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
        <DialogTitle style={{ cursor: 'move', textAlign:'center' }} id="draggable-dialog-title">
          Edit Debt
        </DialogTitle>
        <DialogContent style={{ margin: 'auto 0', textAlign: 'center' }}>
            <br />
        <TextField
            type="number"
            onChange={(e) => props.setAmount(parseInt(e.target.value))}
            label="Payment Amount"
        /><br /><br />
        <DateChange setDueDate={setDueDate} dueDate={dueDate}/>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button autoFocus onClick={handleClose} sx={{'&&:focus': {outline: 'none'}}}>
            Cancel
          </Button>
          <Button onClick={ props.debt.duedate === dueDate 
          ?() => { 
            createQuery('payments', payment)
            .then(()=> updateQuery('debts', debt))
            .then(()=> readQuery('users', props.debt.userID))
            .then(response=> updateQuery('users', 
              {id: props.debt.userID, total: response[0].total - props.amount}))
            .then(()=> query.query === ''
              ? readQuery('debts')
              : readQuery('debts', props.debt.userID, 'userdebts'))
            .then((response)=> setDebts(response))
            .then(handleClose) 
          }
          : () => {
            updateQuery('debts', {id: props.debt.id, duedate: dueDate})
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