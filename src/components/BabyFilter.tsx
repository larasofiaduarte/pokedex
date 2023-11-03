import {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';


const BabyFilter = ({ onCheckboxChange }:any) => {
    const [isBabyChecked, setIsBabyChecked] = useState(false);

    const handleCheckboxChange = (event:any) => {
        const isChecked = event.target.checked;
        setIsBabyChecked(isChecked);
        onCheckboxChange(isChecked);
      };
  
    return (
      <>
      <div style={{display:'flex'}}>
        <Checkbox checked={isBabyChecked} onChange={handleCheckboxChange} sx={{color:'white'}}></Checkbox>
        <div style={{display:'flex', alignItems:'center'}}>Baby</div>
      </div> 
      </>
    );
  };
  
export default BabyFilter;