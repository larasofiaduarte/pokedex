import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import styles from '../styles/styles.scss'

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
        <div style={{ display: 'flex' }}>
        <TextField
            sx={{
                width:130,
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
        />
        <TextField
            sx={{
                width:130,
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
        />
        </div>
    );
}

export default WeightFilter;