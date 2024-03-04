import React, { useEffect, useState } from 'react'
import { updateQuery, createQuery } from '../../axios/AxiosFunctions';
import { useNavigate } from 'react-router-dom';

export default function PublishDebt(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const sum = props.user.total + props.amount
    parseInt(sum)
    console.log(sum)
    createQuery('debts',
      { userID: props.userId, amount: props.amount, duedate: props.dueDate, 
      total: sum, paid: false })
    updateQuery('users', { id: sum , total: sum })
    navigate('/')
  },[])

  return null
  
}
