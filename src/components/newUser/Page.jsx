import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { createQuery } from '../../axios/AxiosFunctions';
import { useNavigate } from 'react-router-dom';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material/';

export default function Page() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [vPassword, setVPassword] = useState(null)
  const [userAdmin, setUserAdmin] = useState(0)
  const navigate = useNavigate()
  const createUser = 
    { name: name, username: username, password: 'Pass1', UserAdmin: userAdmin }

  return (
    <>
        <div className="userInfo">
              <form>
                <div><TextField type='text' onChange={e => setName(e.target.value)} 
                    label="Name"></TextField>
                </div><br/>
                <div><TextField type='text' onChange={e => setUsername(e.target.value)} 
                    label="Username"></TextField>
                </div><br/>
                <div><TextField type='password' onChange={e => setPassword(e.target.value)}
                    label="Password"></TextField>
                </div><br/>
                <div><TextField type='password' onChange={e => setVPassword(e.target.value)}
                    label="Verify Password"></TextField>
                </div><br/>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Set User Admin</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userAdmin}
                        label="Set User Admin"
                        onChange={e => setUserAdmin(e.target.value)}
                    >
                        <MenuItem value={0}>False</MenuItem>
                        <MenuItem value={1}>True</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={password === vPassword 
                  ? () => createQuery('users', createUser)
                    .then(() => navigate('/users')) 
                  : () => alert('These passwords do not match.')}>Create</Button>
              </form>
          </div>
          </>
  )
}
