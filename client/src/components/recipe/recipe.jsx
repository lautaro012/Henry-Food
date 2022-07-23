import './recipe.css';
import { Link } from 'react-router-dom'

export default function Recipe(params) {

    let { name , image, id, health_score } = params
    
    return (
        <Link to= {`/Recipe/${id}`} className='Link'>
            <div className= "recipe-conteiner" id = {id}>  
                <div className='name'>
                <h2> {name} </h2>
                </div>

                <div className='IMG_HS'>
                <img src= {image} alt='imagen' />
                <div className='hs'> {health_score} </div>
                </div>
            </div>
        </Link>
    )
}