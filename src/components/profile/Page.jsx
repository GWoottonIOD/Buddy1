import React, { useState, useContext } from 'react'
import { Button, TextField } from '@mui/material'
import { updateQuery, readQuery } from '../../axios/AxiosFunctions';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';

export default function Page(props) {
  const { setCurrentUser } = useContext(CurrentUserContext)
    const [name, setName] = useState(props.currentUser.name)
    const [username, setUsername] = useState(props.currentUser.username)
    const [password, setPassword] = useState('')
    const [vPassword, setVPassword] = useState(null)
    const navigate = useNavigate()
    const currentUser = props.currentUser
    const updateUser = { id: currentUser.id, name: name, username: username, password: password }

  return (
    <>
        <div className="userInfo">
          {currentUser.username ?
            <>
              <h3>{currentUser.name}</h3>
              <h5>You currently owe: ${currentUser.total}</h5>
              <form>
                <div><TextField type='text' onChange={e => setName(e.target.value)} 
                  defaultValue={currentUser.name} label="Name"></TextField>
                </div><br/>
                <div><TextField type='text' onChange={e => setUsername(e.target.value)} 
                  defaultValue={currentUser.username} label="Username"></TextField>
                </div><br/>
                <div><TextField type='password' onChange={e => setPassword(e.target.value)}
                  label="Password"></TextField>
                </div><br/>
                <div><TextField type='password' onChange={e => setVPassword(e.target.value)}
                  label="Verify Password"></TextField>
                </div><br/>
                <Button onClick={password === vPassword 
                  ? () => updateQuery('users', updateUser)
                    .then(() => readQuery('users', currentUser.id))
                    .then((response) => {setCurrentUser(response[0]);
                    localStorage.setItem("currentUser", JSON.stringify(response[0]))})
                    .then(() => navigate('/users')) 
                  : () => alert('These passwords do not match.')}>Update</Button>
              </form>
            </>
            : <p> User: {currentUser.username} not found</p>
          }
          </div>
          </>
  )
}
