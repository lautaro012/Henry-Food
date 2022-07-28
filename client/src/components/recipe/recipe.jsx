import './recipe.css';
import { Link } from 'react-router-dom'
import * as icons from '../diet-icons/DietIcons'
import HeartIcon from '../diet-icons/icons/icons';

export default function Recipe(params) {

    let { name , image, id, health_score, diets, resume } = params.recipe
    
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

    let dietIcons = diets.map(diet => components[diet.replace(/\s+/g, '')])


    return (
             <Link to= {`/Recipe/${id}`} className='Link' >
            <div className= "card" key={id} > 
                <div className='IMG-CARD'>
                <img src= {image} alt='imagen' className='image'/>
                </div> 
                <div className='CONTEINER-AL-LADO-DE-LA-IMAGEN'>
                    <div className='NOMBRE-Y-DETALLES'>
                        <div className='HS-ICONS'>    
                            <HeartIcon width={65} height={65} fill={'#dd5d26'} className='HEART-ICON'/>
                            <p className='HS-TEXT'>
                                {health_score} 
                            </p>    
                        
                        </div>
                        <div className='SCORE_Y_DIETS'>
                                <div className='name'>
                                    <p>
                                        {name} 
                                    </p>
                                </div>
                                <div className='DIETS-ICONS'>
                                    {dietIcons?.map(Icon => {
                                        return <Icon width={38} height={38} fill={"#dd5d26"} className='diet-icon'/>
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
            </div>
                 </Link>
    )
}