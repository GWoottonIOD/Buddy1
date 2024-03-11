import React, { useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { readQuery } from '../../axios/AxiosFunctions';

export default function GetUser(props) {
  useEffect(() => {
    console.log('users',props.users)
  },[])

  const userOptions = props.users.map((user) => ({
    label: user.name.toString(), // Convert the ID to a string
    value: user.id, // Keep the ID as a number
  }));

  return (
    <>
    <Autocomplete
        disablePortal
        id="User ID"
        onChange={(e, selectedOption) => {
          props.setUserId(selectedOption ? selectedOption.value : null);
          props.setUser?readQuery('users', selectedOption.value)
          .then(response => props.setUser(response[0])):null
          props.setTheQuery?props.setTheQuery(selectedOption.value):null
        }}
        options={userOptions}
        getOptionLabel={(option) => option.label}
        sx={{ width: 195, margin: '0 auto', textAlign: 'center' }}
        renderInput={(params) => <TextField {...params} sx={{ textAlign: 'center' }}  label="User ID" />}
      />
    </>
  );
}
