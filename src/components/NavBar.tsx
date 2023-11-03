
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function MyAppBar() {
  return (
    <AppBar position="static" style={{backgroundColor:'#080a12'}}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
            <img src="src\assets\logo.png" alt="Logo" style={{ width: '150px', height: 'auto' }}/>
        </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;