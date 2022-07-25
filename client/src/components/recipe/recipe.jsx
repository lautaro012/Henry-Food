import './recipe.css';
import { Link } from 'react-router-dom'

export default function Recipe(params) {

    let { name , image, id, health_score, diets, resume } = params.recipe
    
 

    return (
        <Link to= {`/Recipe/${id}`} className='Link' >
            <div className= "card" key={id} >  

                    
                <img src= {image} alt='imagen' className='image'/>
                
                <div className='CONTEINER AL LADO DE LA IMAGEN'>
                    <div className='NOMBRE Y DETALLES'>
                        <div className='name'>
                            <h2>
                                {name} 
                            </h2>
                        </div>
                        <div className='SCORE_Y_DIETS'>
                                <div>
                                {health_score} 
                                </div>                            
                                {diets.map(diet => {
                                    return <div key={diet}>{diet}</div>
                                })}
                            
                        </div>
                    </div>
                    <br></br>
                    <div className='SUMMARY'>
                        {resume?.replace(/<[^>]+>/g, '')}
                    </div>
                </div>
            </div>
        </Link>
    )
}