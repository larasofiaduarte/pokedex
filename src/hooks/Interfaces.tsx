import React from 'react'

export interface Pokemon {
    name: string;
    picture: string;
    evolutions: any[]; 
    types: string[];
    abilities: string[];
    moves: string[];
    height: number; 
    weight: number; 
    url: string;
    id: number;
    isBaby:boolean;
    color:string[];
  }

