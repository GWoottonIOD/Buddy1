import React, {useContext, useState} from 'react'
import { Button } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { PaymentContext } from '../../context/paymentContext';
import DraggableDialog from '../editTransaction/DraggableDialog';
import { updateQuery, readQuery, deleteQuery, createQuery } from '../../axios/AxiosFunctions';

export default function PaidDeleteComponent({ payment }) {
    const { setPayments, payments } = useContext(PaymentContext);
    const [edit, setEdit] = useState(false)
    const [amountPaid, setAmountPaid] = useState(0)

    return (
        <>
            <Button size="small" 
                onClick={() =>
                    readQuery('users', payment.userID )
                    .then((response) => updateQuery('users', { 'id': payment.userID, 'total': parseInt(response[0].total - payment.amount) }))
                    .then(() => deleteQuery('payments', payment.id))
                    .then(() => setPayments(payments.filter((transaction) => transaction.id !== payment.id)))
                } 
                sx={{'&&:focus': {outline: 'none'}}}><ClearIcon/>
            </Button>
            <Button size="small" onClick={() => { setEdit(!edit) }}
                sx={{'&&:focus': {outline: 'none'}}}><EditIcon/>
            </Button>
            {edit ? <DraggableDialog payment={payment} edit={edit} setEdit={setEdit} amount={amountPaid} setAmount={setAmountPaid} /> 
                : null
            }
        </>
    )
}
