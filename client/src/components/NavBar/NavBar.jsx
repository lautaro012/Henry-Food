import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../../redux/actions";
import { Link, useHistory } from 'react-router-dom';
import './NavBar.css'
import CreateRecipe from '../diet-icons/icons/Create'
import Home from '../diet-icons/icons/Home'
import Lupa from '../diet-icons/icons/Lupa'

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
           

                <button onClick={navigateTo} className='HOME-BTN'>
                    <Home fill={'#dd5d26'}></Home>
                </button>   

            <div className="NAV-SEARCH">
                <input
                className="INPUT-SEARCH"
                type = 'text'
                placeholder="Buscar..."    
                onChange={(e) => handleInputChange(e)} 
                />
                <button
                className="HOME-BTN"
                type = 'submit'
                onClick={(e) => handleSubmit(e)}
                >
                <Lupa fill='#dd5d26'/>
                </button>
            
            </div>

            <div className="NAV-CREATE">
                <Link to='/CreateRecipe'>
                    <CreateRecipe fill={'#dd5d26'}/>               
                </Link>
            </div>

        </div>

    )

};