import './recipe.css';
import { Link } from 'react-router-dom'
import * as icons from '../diet-icons/DietIcons'
import Heart from '../diet-icons/icons/Heart';
import { useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/actions';

export default function Recipe({ recipe, favrecipes}) {
    let { name , image, id, health_score, diets, resume, readyInMinutes } = recipe
    console.log(recipe)
    
    let dispatch = useDispatch()
    const components = {
        glutenfree: icons.Glutenfree,
        dairyfree: icons.Dairyfree,
        ketogenic: icons.Keto,
        lactoovovegetarian: icons.Lactovoveg,
        vegan: icons.Vegan,
        pescatarian: icons.Pesca,
        paleolithic: icons.Paleo,
        primal: icons.Primal,
        fodmapfriendly: icons.Fodmap,
        whole30: icons.Whole
    }

    let dietIcons = diets?.map(diet => components[diet.replace(/\s+/g, '')])
    let count = 0

    function handleFavourite(e) {
        if(e.target.checked) dispatch(addToFavorites(e.target.value));
        else dispatch(removeFromFavorites(e.target.value))
    }


    return (
        <div className= "card" key={id} > 
             <Link to= {`/Recipe/${id}`} className='Link' >
                <div className='IMG-CARD'>
                <img src= {image} alt='imagen-not-found' className='image'/>
                </div> 
                <div className='CONTEINER-AL-LADO-DE-LA-IMAGEN'>
                    <div className='NOMBRE-Y-DETALLES'>
                        <div className='HS-ICONS'>    
                            <p className='HS-TEXT'>
                                {health_score} 
                            </p>    
                            <Heart width={65} height={65} fill={'#dd5d26'} className='HEART-ICON'/>
                        
                        </div>
                        <div className='SCORE_Y_DIETS'>
                                <div className='name'>
                                    <p>
                                        {name} 
                                    </p>
                                    <div>
                                          {readyInMinutes}
                                    </div>
                                </div>
                                <div className='DIETS-ICONS'>
                                    {dietIcons?.map(Icon => {
                                        return <Icon key={count++} width={38} height={38} fill={"#dd5d26"} className='diet-icon'/>
                                    })}    
                                </div>                            
                        </div>
                    </div>
                    <div className='limit'>
                        <p>
                        {resume?.replace(/<[^>]+>/g, '')}
                        </p>

                    </div>
                </div>
                 </Link>
                {
                    favrecipes.includes(recipe) ?
                    <div className="card-favourite">
                        <input id={`hearth-${id}`} type="checkbox" value={name} onClick={(e) =>handleFavourite(e)} checked={true} className="favourite-checkbox"/>
                        <label className="favourite-label" htmlFor={`hearth-${id}`}>❤</label>
                    </div>
                    :
                    <div className="card-favourite">
                        <input id={`hearth-${id}`} type="checkbox" value={name} onClick={(e) =>handleFavourite(e)} className="favourite-checkbox"/>
                        <label className="favourite-label" htmlFor={`hearth-${id}`}>❤</label>
                    </div>
                }

            </div> 
    )
}