import React from "react";
import { useState } from "react";
import { TextField, Button, Box, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../context/CurrentUserContext";
import axios from "axios";
export default function NewLogin() {
  const { handleUser } = useCurrentUserContext()
  const navigate = useNavigate()
  const [LUserName, setLUserName] = useState("");
  const [LPassWord, setLPassWord] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [validateMsg, setValidateMsg] = useState("");

  const handleLogin = async () => {
    const username = LUserName;
    const password = LPassWord;
    try {
      const response = await axios.post(
        `${window.location.origin.slice(0,-5)}:8063/api/users/login`,
        { username, password }
      );
      const user = response.data.data.user
      if (user.username === username) {
        handleUser(user);
      } else { setValidateMsg("Incorrect username or password") }
      
      navigate("/");
    } catch (error) {
      console.error(error);
      setValidateMsg('Password or username is incorrect.')
    }
  };

  return (
    <div>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 20,
          pb: 4,
        }}
      >
        {validateMsg}<br />
        <div>
          <TextField type='text' onChange={e => setLUserName(e.target.value)}
            label="Username">
          </TextField><br /><br />
          <TextField type='password' onChange={e => setLPassWord(e.target.value)}
            label="Password">
          </TextField><br /><br />
          <FormGroup sx={{ alignItems: 'center' }}>
            <FormControlLabel control={<Checkbox defaultChecked />}
             label="Remember Me" onChange={() => setRememberMe(!rememberMe)} />
          </FormGroup><br />
        </div>
        <div>
          <Button size="small" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Box>
    </div>
  );
}
