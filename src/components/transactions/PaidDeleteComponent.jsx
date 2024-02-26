import React, {useContext, useState} from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { DebtContext } from '../../context/DebtContext';
import DraggableDialog from '../editTransaction/DraggableDialog';

export default function PaidDeleteComponent({ debt }) {
    const { setDebts, debts } = useContext(DebtContext);
    const [edit, setEdit] = useState(false)
    const [amountPaid, setAmountPaid] = useState(0)
    const getUsers = (userid, amount) => {
        console.log(userid, amount)
        const axGetUsers = `http://localhost:8063/api/users/${userid}`
        axios.get(axGetUsers)
            .then(response => {
                updateBalance(response.data.data[0].total, userid, amount)
            })
            .catch(error => { console.log(error) })
    }

    //delete a debt
    const debtDelete = (debtid, userid, amount, paid) => {
        console.log('deleted')
        const axdebts = `http://localhost:8063/api/debts/delete/${debtid}`
        axios.delete(axdebts)
            .then(response => {
                console.log(response);
                { paid ? setDebts(debts.filter((transaction) => transaction.id !== debt.id))
                     : getUsers(userid, amount) }
            })
            .catch(error => { console.log(error) })
    }

    //pay a debt
    const debtPaid = (debtid, userid, amount) => {
        console.log('paid')
        const pay = { 'paid': true }
        const axdebts = `http://localhost:8063/api/debts/put/${debtid}`
        axios.put(axdebts, pay)
            .then(response => { 
                console.log(response.data.data);
             })
            .catch(error => { console.log(error) })
        getUsers(userid, amount)
    }

    const updateBalance = (owed, userid, amount) => {
        const total = owed - amount
        console.log(owed, userid, amount)
        const axPutUsers = `http://localhost:8063/api/users/put/${userid}`
        axios.put(axPutUsers, { 'total': total })
            .then(response => { console.log(response.data.data); 
                setDebts(debts.filter((transaction) => transaction.id !== debt.id))
            })
            .catch(error => { console.log(error) })
    }

    return (
        <>
            {debt.paid?null:<Button size="small" 
                onClick={() => { debtPaid(debt.id, debt.userID, debt.amount) }} 
                sx={{'&&:focus': {outline: 'none'}}}><DoneIcon/>
            </Button>}
            <Button size="small" 
                onClick={() => { debtDelete(debt.id, debt.userID, debt.amount, debt.paid) }} 
                sx={{'&&:focus': {outline: 'none'}}}><ClearIcon/>
            </Button>
            <Button size="small" onClick={() => { setEdit(!edit) }}
                sx={{'&&:focus': {outline: 'none'}}}><EditIcon/>
            </Button>
            {edit ? <DraggableDialog debt={debt} edit={edit} setEdit={setEdit} amount={amountPaid}
                getUsers={getUsers} setAmount={setAmountPaid} debtPaid={debtPaid}/> 
                : null
            }
        </>
    )
}
