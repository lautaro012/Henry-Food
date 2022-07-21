import './recipe.css';

export default function Recipe({ name , image, id, health_score }) {
    return <div className= "recipe" id = {id}>  
        <div>
        <h2> {name} </h2>
        <h4> {health_score} </h4>
        </div>
        <img src= {image} alt='imagen' />
    </div>
}