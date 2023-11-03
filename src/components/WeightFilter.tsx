import {useState} from 'react';
import TextField from '@mui/material/TextField';

function WeightFilter({ onMinWeightChange, onMaxWeightChange }:any) {
    const [minWeight, setMinWeight] = useState(0);
    const [maxWeight, setMaxWeight] = useState(1999);

    const handleMinWeightChange = (event: any) => {
        const minWeight = event.target.value;
        setMinWeight(minWeight);
        onMinWeightChange(minWeight);
      };
    
      const handleMaxWeightChange = (event: any) => {
        const maxWeight = event.target.value;
        setMaxWeight(maxWeight);
        onMaxWeightChange(maxWeight);
      };

    return (
        <div style={{display:'flex'}} className="filterWeight">
        <TextField
            sx={{
                padding:1,
                width:150,
                "& .MuiInputBase-root":{
                    height:38,
                    backgroundColor:'white',
                },
                "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":{
                    
                }
            }}
            label="Min Weight"
            type="number"
            onChange={handleMinWeightChange}
            className="filterWeightTxt"
        />
        <TextField
            sx={{
                padding:1,
                width:150,
                textAlign:'center',
                fontSize:'10',
                "& .MuiInputBase-root":{
                    height:38,
                    backgroundColor:'white',
                    
                }
            }}
            label="Max Weight"
            type="number"
            onChange={handleMaxWeightChange}
            className="filterWeightTxt"
        />
        </div>
    );
}

export default WeightFilter;