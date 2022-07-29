import './Recipefav.css'
import Heart from '../diet-icons/icons/Heart';
import { Link } from 'react-router-dom'

export function Recipefav (params) {

    let {name, image, id, health_score} = params.recipe

    return (
        <Link to= {`/Recipe/${id}`} className='Link' >
            <div key={id} className='FAV-CONT'>
                <div className='FAV-NAME'>
                    {name}
                </div>
                <div className='FAV-IMG-HS'>
                    <div className='FAV-IMG-CONT'>
                        <img src= {image} alt='imagen' className='FAV-IMG'/>
                    </div>
                    <div className='FAV-HS-ICON'>
                        {health_score} <Heart fill={'#dd5d26'} ></Heart>
                    </div>
                </div>
            </div>
        </Link>
    )




}