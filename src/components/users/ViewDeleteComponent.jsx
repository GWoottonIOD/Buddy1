import React from 'react'
import { Button, CardActions } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import { deleteQuery } from '../../axios/AxiosFunctions';
import { useUserContext } from '../../context/UserContext';

export default function ViewDeleteComponent(props) {
    const {users, setUsers} = useUserContext()
    return (
        <div>
            <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
                <Button size="small" href={"/userinfo/" + props.user.id}><VisibilityIcon/></Button>
                <Button size="small" onClick={
                    () =>  deleteQuery('users',props.user.id)
                    .then(() => setUsers(users.filter((user) => user.id !== props.user.id))) 
                    }><ClearIcon/></Button>
            </CardActions>
        </div>
    )
}
