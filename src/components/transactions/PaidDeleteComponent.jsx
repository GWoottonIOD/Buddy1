import React, {useContext, useState} from 'react'
import { Button } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { DebtContext } from '../../context/DebtContext';
import DraggableDialog from '../editTransaction/DraggableDialog';
import { updateQuery, readQuery, deleteQuery } from '../../axios/AxiosFunctions';

export default function PaidDeleteComponent({ debt }) {
    const { setDebts, debts } = useContext(DebtContext);
    const [edit, setEdit] = useState(false)
    const [amountPaid, setAmountPaid] = useState(0)

    return (
        <>
            {debt.paid?null:<Button size="small" 
                onClick={() => 
                    readQuery('users', debt.userID )
                    .then((response) => updateQuery('users', { 'id': debt.userID, 'total': parseInt(response[0].total - debt.amount) }))
                    .then(() => updateQuery('debts', { 'id': debt.id, 'paid': true }))
                    .then(() => setDebts(debts.filter((transaction) => transaction.id !== debt.id)))
                }
                sx={{'&&:focus': {outline: 'none'}}}><DoneIcon/>
            </Button>}
            <Button size="small" 
                onClick={() =>
                    readQuery('users', debt.userID )
                    .then((response) => updateQuery('users', { 'id': debt.userID, 'total': parseInt(response[0].total - debt.amount) }))
                    .then(() => deleteQuery('debts', debt.id))
                    .then(() => setDebts(debts.filter((transaction) => transaction.id !== debt.id)))
                } 
                sx={{'&&:focus': {outline: 'none'}}}><ClearIcon/>
            </Button>
            <Button size="small" onClick={() => { setEdit(!edit) }}
                sx={{'&&:focus': {outline: 'none'}}}><EditIcon/>
            </Button>
            {edit ? <DraggableDialog debt={debt} edit={edit} setEdit={setEdit} amount={amountPaid} setAmount={setAmountPaid} /> 
                : null
            }
        </>
    )
}
