import React from 'react'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Button, TextField, Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import { UsersContext } from '../context/UserContext';
import dayjs from 'dayjs'; // Import Day.js
import { Troubleshoot } from '@mui/icons-material';
import Axios from '../axios/Axios';
import GetUser from '../components/newTransaction/GetUser';
import GetUsers from '../components/newTransaction/GetUsers';

export const DebtNew = () => {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    let navigate = useNavigate();

    //if a non user is trying to gain access, this will redirect them.
    const doNotProceed = () => {
        if (currentUser === null) {
            navigate('/pna');
        }
    }
    doNotProceed()

    return (

        <div className="plantInfo">
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 15,
                    pb: 4,
                }}
            ></Box>
            <form>
                <GetUsers />
            </form>
        </div>
    )
}
