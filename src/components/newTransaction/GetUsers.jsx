import React, {useState, useEffect} from 'react'
import { readQuery } from '../../axios/AxiosFunctions';
import GetUser from './GetUser';
export default function GetUsers() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
      readQuery('users')
      .then(response => setUsers(response))
    },[])

  return (
    <div>
        {users ? <GetUser users={users}/> : null}
    </div>
  )
}
