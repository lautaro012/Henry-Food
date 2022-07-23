import { Link } from "react-router-dom";
import './Landing.css'

export default function Landing() {
    return <div className= 'Landing'>
        <h3> HENRY FOOD </h3>
        <Link to= '/home'> 
        <button>COMENZAR</button> 
        </Link>
    </div>
    
}