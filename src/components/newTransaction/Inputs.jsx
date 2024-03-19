import React, { useState } from 'react'
import { Button } from '@mui/material'
import DateChange from './DateChange';
import { updateQuery, createQuery } from '../../axios/AxiosFunctions';
import ChangeAmount from './ChangeAmount';
import { useNavigate } from 'react-router-dom';

export default function Inputs(props) {
    const [dueDate, setDueDate] = useState(null);
    const [amount, setAmount] = useState(null)
    const navigate = useNavigate();

    const sum = parseInt(props.user.total + amount)
    const debt = { userID: props.userId, amount: amount, duedate: dueDate, 
        total: sum, paid: false }
    
    return (
        <div>
            <ChangeAmount setAmount={setAmount}/>
            <DateChange setDueDate={setDueDate}/><br/>
            <Button onClick={amount == null || dueDate == null || props.user == null
            ? null
            : () => createQuery('debts', debt)
            .then(()=> updateQuery('users', { id: props.userId , total: sum }))
            .then(()=> navigate('/'))
            }>
                Add
            </Button>
        </div>
    )
}