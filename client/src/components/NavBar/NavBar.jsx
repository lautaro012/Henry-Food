import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../../redux/actions";



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

    return (
        <div>
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
        </div>

    )

};