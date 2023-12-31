
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

import {Link} from 'react-router-dom';


const ListView = (props:any) => {

    //tslint:disable-next-line
    const { pokemonData } = props;
    const searchTerm = props.searchTerm;
    console.log(pokemonData)
    return (
        <>

        <TableContainer component={Paper} className="table">
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
                    {props.pokemonData.filter((pokemon:any)=>{
                        return searchTerm.toLowerCase() === '' ? pokemon : pokemon.name.toLowerCase().includes(searchTerm)
                    }).map((pokemon:any) => (
                    <TableRow key={pokemon.name}>
                        <TableCell>
                        <img src={pokemon.picture} alt={pokemon.name} style={{ width: '100px' }} />
                        </TableCell>
                        <TableCell sx={{fontWeight:'bold', fontSize:'1em'}}>
                            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                        </TableCell>
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
        
        </>
    )
}

export default ListView;