
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function MyAppBar() {
  return (
    <AppBar position="static" style={{backgroundColor:'#080a12'}}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
            <img src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png" alt="Logo" style={{ width: '150px', height: 'auto' }}/>
        </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;