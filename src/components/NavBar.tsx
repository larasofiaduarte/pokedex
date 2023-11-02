import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function MyAppBar() {
  return (
    <AppBar position="static" sx={{backgroundColor:'black'}}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
            <img src="src\assets\logo.png" alt="Logo" style={{ width: '150px', height: 'auto' }} />
            <button color="inherit">Login</button>
        </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;