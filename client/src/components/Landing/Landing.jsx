import { Link } from "react-router-dom";
import './Landing.css'


export default function Landing() {
    return <div className= 'Landing'>
        <div className="GREETINGS">
        <link href="//db.onlinewebfonts.com/c/474c729bb9f706dac41385247d5dbc7c?family=Culinary" rel="stylesheet" type="text/css"/>
        <Link to= '/home'> 
        <button className="START"> Let's Cook !! </button>
        </Link>
        </div>
    </div>
    
}