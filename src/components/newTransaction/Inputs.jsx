import React, {useState} from 'react'
import {Button} from '@mui/material'
import DateChange from './DateChange';
import PublishDebt from './PublishDebt';
import ChangeAmount from './ChangeAmount';

export default function Inputs(props) {
    const [dueDate, setDueDate] = useState(null);
    const [amount, setAmount] = useState(null)
    const [count, setCount] = useState(0)

    const inputCheck = () => {
        if (amount == null || dueDate == null || props.user == null) {
            alert('Please fill in all fields')
        } else {setCount(count+1)}
    }
    
    return (
        <div>
            <ChangeAmount setAmount={setAmount}/>
            <DateChange setDueDate={setDueDate}/><br/>
            <Button onClick={inputCheck}>Add</Button>
            {count===1 
                ? <PublishDebt user={props.user} userId={props.userId} amount={amount} dueDate={dueDate}/> 
                : null}
        </div>
    )
}