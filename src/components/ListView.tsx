import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const ListView = (props:any) => {

    const pokemonData = props.pokemonData

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Pokemon</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Evolutions</TableCell>
                        <TableCell>Types</TableCell>
                        <TableCell>Moves</TableCell>
                        <TableCell>Height</TableCell>
                        <TableCell>Weight</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.pokemonData.map((pokemon:any) => (
                    <TableRow key={pokemon.name}>
                        <TableCell>
                        <img src={pokemon.picture} alt={pokemon.name} style={{ width: '100px' }} />
                        </TableCell>
                        <TableCell sx={{fontWeight:'bold', fontSize:'1em'}}>{pokemon.name}</TableCell>
                        <TableCell>
                        {pokemon.evolutions.map((evolutions:any, index:number) => (
                            <div key={index}>{evolutions}</div>
                        ))}
                        </TableCell>
                        <TableCell>{pokemon.types.join(', ')}</TableCell>
                        
                        <TableCell>{pokemon.moves.join(', ')}</TableCell>
                        <TableCell>{pokemon.height}cm</TableCell>
                        <TableCell>{pokemon.weight}gr</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ListView;