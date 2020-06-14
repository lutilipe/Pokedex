import React, { useState, useEffect} from 'react'
import { FiArrowLeft, FiArrowRight,  } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import './style.css'

interface Pokemon {
    abilities: Array<{
        ability: {
            name: string;
        }
    }>
    id: number;
    name: string;
    height: number;
    weight: number;
    types: Array<{
        type: {
            name: string;
        }
    }>
    stats: Array<{
        base_stat: number;
        stat: {
            name: string;
        }
    }>
}

const Detail = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [detail, setDetail] = useState<Pokemon>()
    const [image, setImage] = useState<string>('')
    
    const { id } = useParams()

    useEffect(() => {
        async function loadDetails() {
            let response = await axios
                    .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)

            const image = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
            setImage(image)

            setDetail(response.data)
            setLoading(false)
        }
        loadDetails()

    }, [id])

    function capitalize(s: string) {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    return (
        <div className='detail-grid'>
            {
            loading ? 
                <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={70}
                    width={70}
                /> : null
            }

            <header>
                <Link 
                    to={`/${id - 1 === 0 ? 151 : id-1}`} 
                    style={{color: '#25282b'}}>
                    <FiArrowLeft className='back' />
                </Link>

                <div>
                    <span className='id'>
                        {String(detail?.id).length === 1 ? `#00${detail?.id} ` :
                        String(detail?.id).length === 2 ? `#0${detail?.id} ` :
                        String(detail?.id).length === 3 ? `#${detail?.id} ` : null}
                    </span>
                    

                    <span className='name'>
                        {detail?.name ? capitalize(detail.name) : null}
                    </span>
                </div>

                <Link 
                    to={`/${Number(id) + 1 === 152 ? 1 : Number(id)+1}`} 
                    style={{color: '#25282b'}}>
                    <FiArrowRight className='next'/>
                </Link>
            </header>

            <div className='detail-content'>
                
                <img src={image} alt={detail?.name}/>

                <div className='info'>
                    <ul className={`details ${detail?.types[0].type.name}`}>

                        <li>
                            <span className='detail-title'>
                                Weight: 
                            </span>
                            <span className='detail-name'>
                                {detail?.weight ? detail.weight / 10: null} kg
                            </span>
                        </li>


                        <li>
                            <span className='detail-title'>
                                Height: 
                            </span>
                            <span className='detail-name'>
                                {detail?.height ? detail.height / 10 : null} m
                            </span>
                        </li>

                        <li>
                            <span className='detail-title'>
                                Types: 
                            </span>
                            <span className='detail-name'>
                                {detail?.types.map(t => capitalize(t.type.name)).join(', ')}
                            </span>
                        </li>
                    
                    
                        <li>
                            <span className='detail-title'>
                                Ability: 
                            </span>
                            <span className='detail-name'>
                                {detail?.abilities[0].ability.name ? capitalize(detail.abilities[0].ability.name) : null}
                            </span>
                        </li>
                    </ul>

                    <div className='stats-container'>
                            {detail?.stats.map(s => (
                            <div 
                            className='stat'
                            key={s.stat.name}>
                                <p>{capitalize(s.stat.name)}:</p>
                                <div className='bar'>
                                    <div 
                                    className='bar-percentage'
                                    style={{width: `${(s.base_stat / 250) * 100}%`}} />
                                </div>
                            </div> 
                        ))}
                    </div>
                </div>
            </div>

            <footer>
                <Link to="/"
                style={{color: 'white',
                        textDecoration: 'none'}}>
                    <button>Explorar mais Pokémon</button>
                </Link>
            </footer>
        </div>
    )
}

export default Detail