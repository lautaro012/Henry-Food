import { Link } from "react-router-dom";
import './Landing.css'


export default function Landing() {
    return <div className= 'Landing'>
        <div className="GREETINGS">
        <Link to= '/home'> 
        <button className="START"> Let's Cook !! </button>
        </Link>
        </div>
    </div>
    
}