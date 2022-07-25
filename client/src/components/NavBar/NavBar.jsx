import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { fetchRecipes, FETCH_RECIPE, filterCreated } from "../../redux/actions";
import { Link } from 'react-router-dom';
import './NavBar.css'


export default function NavBar() { 
    let dispatch = useDispatch()
  

    const [name, setName] = useState('')
     
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(fetchRecipes(name))
        setName('')
    }
    

    function handleMyRecipes(e) {
        dispatch(filterCreated(e.target.value))
        // console.log(e.target.value)
    }


    return (
        
        <div className='NAVBAR'>

            <Link to='/home'>
            <button>
                HOME
            </button>
            </Link>

        <br></br>

            <input
            type = 'text'
            placeholder="Buscar..."    
            onChange={(e) => handleInputChange(e)} 
            />
            <button
            type = 'submit'
            onClick={(e) => handleSubmit(e)}
            >
            BUSCAR
            </button>

        <br></br>

            <Link to='/CreateRecipe'>
                <button> CREAR RECETA </button>
            </Link>

            <button onClick={(e) => handleMyRecipes(e)}>
                MIS RECETAS
            </button>

        </div>

    )

};