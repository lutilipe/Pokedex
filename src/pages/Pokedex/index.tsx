import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from 'react-loader-spinner'

import './style.css'


interface Pokemon {
    name: string;
    types: Array<{
        type: {
            name: string;
        }
    }>
}

const Pokedex = () => {
    const [pokemonNames, setPokemonNames] = useState<string[]>([])
    const [pokemonTypes, setPokemonTypes] = useState<string[][]>([])
    const [pokemonImages, setPokemonImages] = useState<string[]>([])

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const allNames: string[] = []
        const allTypes: string[][] = []
        
        async function loadPokemons() {
            for (let id = 1; id < 152; id++) {
                let response = await axios
                    .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
                
                const type =  response.data.types.map(t => t.type.name)
                
                allTypes.push(type)
                allNames.push(response.data.name)
            }   
            
            setLoading(false)
            setPokemonTypes(allTypes)
            setPokemonNames(allNames)       
        }

        loadPokemons()
    }, []) 

    useEffect(() => {
        const allImages: string[] = []
        function getPokemonImages() {
            for (let id = 1; id < 152; id++) {
                allImages.push(`https://pokeres.bastionbot.org/images/pokemon/${id}.png`)
            }
       
            setPokemonImages(allImages)
        }

        getPokemonImages()
    },[])

    function capitalize(s: string) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    return( 
        <ul className='pokemon-grid'>
            {
            loading ? 
                <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={70}
                    width={70}
                /> : null
            }

            {pokemonNames.map((pokemon, index) => (
                <Link 
                to={`/${index+1}`}
                key={pokemon}
                style={
                    {
                        textDecoration: 'none',
                        color: '#25282b'
                    }
                }>
                    <li
                    className={pokemonTypes[index][0]}>
                        <div className='img-container'>
                            <img src={pokemonImages[index]} alt={pokemon}/>
                        </div>
                        <div className='info-content'>
                            <span className='pokemon-id'>{
                                String(index).length === 1 ? `#00${index+1}` :
                                String(index).length === 2 ? `#0${index+1}` :
                                String(index).length === 3 ? `#${index+1}` : null
                            }</span>
                        </div>
                        <div className='info-content'>
                            <span className='pokemon-name'>{capitalize(pokemon)}</span>
                        </div>
                        <div className='info-content'>
                            <span 
                            className='pokemon-type'
                            >
                                {`${
                                    pokemonTypes[index].length === 2 
                                    ? 'Type: ' + pokemonTypes[index][0] + ', ' + pokemonTypes[index][1]
                                    : 'Type: ' + pokemonTypes[index][0]
                                    }`
                                }
                            </span>
                        </div>
                    </li>
                </Link>
            ))}
        </ul>
    )
}

export default Pokedex