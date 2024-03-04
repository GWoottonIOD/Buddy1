import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { readQuery } from '../../axios/AxiosFunctions';
import Inputs from './Inputs';

export default function GetUser(props) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(false);

  const users = props.users;
  const userOptions = users.map((user) => ({
    label: user.name.toString(), // Convert the ID to a string
    value: user.id, // Keep the ID as a number
  }));

  const userObj = users.find(user => user.id === userId);

  return (
    <>
    <div>{user?userObj.name:"Add a transaction"}</div>
    <br/>
    <Autocomplete
        disablePortal
        id="User ID"
        onChange={(e, selectedOption) => {
          setUserId(selectedOption ? selectedOption.value : null);
          readQuery('users', selectedOption.value)
          .then(response => setUser(response[0]))
        }}
        options={userOptions}
        getOptionLabel={(option) => option.label}
        sx={{ width: 195, margin: '0 auto', textAlign: 'center' }}
        renderInput={(params) => <TextField {...params} sx={{ textAlign: 'center' }}  label="User ID" />}
      /><br/>
      {user?<Inputs user={user} userId={userId}/>: null}
    </>
  );
}
