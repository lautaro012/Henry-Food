import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../../redux/actions";
import { Link, useHistory } from 'react-router-dom';
import './NavBar.css'


export default function NavBar() { 
    let dispatch = useDispatch()
    const history = useHistory();

    const navigateTo = () => history.push('/home');

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
    



    return (
        <div className='NAVBAR'>

            <button onClick={navigateTo} className="HOME-BTN">
                HOME
            </button>
            

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

        </div>

    )

};