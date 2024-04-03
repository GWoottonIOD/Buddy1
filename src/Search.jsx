import React from 'react'
import { useState, useEffect, useContext } from 'react'
import {TextField, Button} from '@mui/material';
import {SearchContext} from './context/SearchContext'
import SearchIcon from '@mui/icons-material/Search';
import {readQuery} from './axios/AxiosFunctions'
import GetUser from './components/newTransaction/GetUser';

export default function DebtSearch(props) {
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const {query, setQuery} = useContext(SearchContext);

  useEffect(() => {
    readQuery('users').then(response => setUsers(response))
  },[])

  const setTheQuery = (id) => {
    setQuery({query: id, doISearch: query.doISearch})
  }

  return (
      <div>
        {users.length!==0?<GetUser users={users} setUserId={setUserId} setTheQuery={setTheQuery}/>: null}
      </div>
      
  )
}