import { useState } from 'react'
import '../styles/App.css';
import PokemonData from './PokemonData';
import PokemonContainer from './PokemonContainer';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

export default function App() {
  return(
    <PokemonContainer/>
  )
}
