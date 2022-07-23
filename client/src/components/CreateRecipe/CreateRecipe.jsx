import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, fetchDiets } from "../../redux/actions";
import { useEffect } from "react";
import './CreateRecipe.css'
import { useHistory } from "react-router-dom";


export default function CreateRecipe() {

    let dispatch = useDispatch();
    let history = useHistory();
    const dietsfetched = useSelector(state => state.diets)
    
    
    //lo que necesita mi POST:  
    const [input, setInput] = useState({
        name: '',
        resume: '',
        health_score: 0,
        step_by_step: '',
        diets: [],
        image: ''
    })


    useEffect(() => {
        dispatch(fetchDiets());
    }, [dispatch])
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: [e.target.value]
        })
    }

    function handleCheck(e) {
        
        if(e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
            console.log(input)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(createProduct(input));
        alert('Receta Creada Satisfactoriamente');
        setInput({
            name: '',
            resume: '',
            health_score: 0,
            step_by_step: '',
            diets: [],
            image: ''
        })
        history.push('/home')
    }

    return (
        <div className="form-general">
            <h1>CREAR RECETA</h1>
            <div className="form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Nombre: </label>
                        <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={handleChange}
                        />
                    </div> 
                    <div>
                        <label>Resume: </label>
                        <input
                        type='text'
                        value={input.resume}
                        name='resume'
                        onChange={handleChange}
                        />
                    </div>     
                    <div>
                        <label>HealthScore: </label>
                        <input
                        type='number'
                        value={input.health_score}
                        name='health_score'
                        onChange={handleChange}
                        />
                    </div>       
                    <div>
                        <label>Paso a Paso: </label>
                        <input
                        type='text'
                        value={input.step_by_step}
                        name='step_by_step'
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Imagen: </label>
                        <input
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={handleChange}
                        />
                    </div>    
                    <div className="diets">
                        <label> STATUS </label>
                        {dietsfetched.map((diets) => {

                                return (
                                
                                <label><br></br><input
                                type='checkbox'
                                name='diets'
                                value={diets.name}
                                onChange={handleCheck}
                                ></input>{diets.name}</label>
                                
                                )
                            
                            })
                        }                 
                    </div>    
                    <button type='submit'> CREAR RECETA </button> 
                </form>
            </div>
            
        </div>
    )
}