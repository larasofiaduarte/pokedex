import React from 'react'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { Divider } from '@mui/material';

function Details( {pokemonData}:any) {
    const { name } = useParams();

    const pokemon = pokemonData.find((p:any) => p.name === name);

    console.log(pokemon)

    return (
        <div>
        
            <div>
                <div style={{display:'flex', alignItems:'left'}}>
                    <Link to="/">
                        <button>Back</button>
                    </Link>
                    
                </div>
                
                <div style={{display:'flex'}}>
                    <div>
                        <img className="detailsImg" src={pokemon.picture}></img>
                    </div>
                    <div className="detailsCont">
                        <h2>{pokemon.name}</h2>
                        <div className="detailsInfo">
                            <Divider className="divider"></Divider>
                            <div className="detailsInfo">Color: {pokemon.color}</div>
                            <Divider className="divider"></Divider>
                            <div className="detailsInfo">Types: {pokemon.types.join(',')}</div>
                            <Divider className="divider"></Divider>
                            <div className="detailsInfo">Top Moves: {pokemon.moves.join(',')}</div>
                            <Divider className="divider"></Divider>
                            <div className="detailsInfo">Evolutions: {pokemon.evolutions.join(',')}</div>
                            <Divider className="divider"></Divider>
                            <div className="detailsInfo">Weight: {pokemon.weight}gr</div>
                            <Divider className="divider"></Divider>
                            <div className="detailsInfo">Height: {pokemon.height}cm</div>
                            <Divider className="divider"></Divider>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default Details