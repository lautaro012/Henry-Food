import React from "react";
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './NavBar.css'
import CreateRecipe from '../diet-icons/icons/Create'
import Home from '../diet-icons/icons/Home'
import Lupa from '../diet-icons/icons/Lupa'

export default function NavBar( { validate, onSearch }) { 
    const history = useHistory();

    const navigateTo = () => history.push('/home');

    const [name, setName] = useState('')
    
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        onSearch(name)
        setName('')
    }
    

    return (
        <div className='NAVBAR'>
            
            <button onClick={navigateTo} className='HOME-BTN'>
                <Home fill={'#dd5d26'}></Home>
            </button>   

           
                {
                    validate ?
                    <div className="NAV-SEARCH">
                        <form onSubmit={(e) => handleSubmit(e)} className={'FORM-NAV'}>
                            <input
                            className="INPUT-SEARCH"
                            type = 'text'
                            placeholder="Buscar..."    
                            onChange={(e) => handleInputChange(e)} 
                            />
                            <button
                            className="HOME-BTN"
                            type = 'submit'
                            >
                            <Lupa fill='#dd5d26'/>
                            </button>    
                        </form>
                    </div>
                    :
                    null
                }

            
            <div className="NAV-CREATE">
                <Link to='/CreateRecipe'>
                    <CreateRecipe fill={'#dd5d26'}/>               
                </Link>
            </div>

        </div>

    )

};