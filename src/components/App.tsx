import { useState } from 'react'
import '../styles/styles.scss';
import PokemonData from '../hooks/PokemonData';
import PokemonContainer from './PokemonContainer';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import Container from './Container';

export default function App() {
  return(
      <Container/>
  )
}
