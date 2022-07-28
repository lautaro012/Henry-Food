import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, fetchDiets, fetchRecipes } from "../../redux/actions";
import { useEffect } from "react";
import './CreateRecipe.css'
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";



function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Name is required'
    }
    if (!input.resume) {
        errors.resume = 'Resume is required'
    } 
    if (typeof input.name !== 'string') {
        errors.name = 'Name must not contain numbers'
    }
    
    if (!input.health_score) {
        errors.HealthscoreNull = 'HealthScore is required' 
    } else if(parseInt(input.health_score) < 0 || parseInt(input.health_score) > 100) {
        errors.HealthscoreMaxMin = 'HealthScore must be a number between 0-100'
    } else if(!parseInt(input.health_score)) {
        errors.HealthscoreNotNum = 'HealthScore must be a number'
    }

    return errors
  }


export default function CreateRecipe() {
    let dispatch = useDispatch();
    let history = useHistory();
    
    const dietsfetched = useSelector(state => state.diets)
    
    
    const [errors, setErrors] = useState({})
    const [instructionList, setInstructionList] = useState([
        {Step: ''},
    ])
    const [ingredientList, setIngredientsList] = useState([
        {Ingredient: ''} ,
    ])
    //lo que necesita mi POST:  
    const [input, setInput] = useState({
        name: '',
        resume: '',
        health_score: 1,
        step_by_step: 'There are no instructions',
        diets: [],
        image: '',
        extendedIngredients: 'There are no Ingredients'
    })

    useEffect(() => {
        dispatch(fetchDiets());
        dispatch(fetchRecipes());
    }, [])
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleCheck(e) {
        
        if(e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        } else {
            let filteredDiets = input.diets.filter(diet => { return diet !== e.target.value })
            setInput({
                ...input,
                diets: filteredDiets
            })
        }

    }
    
    // Funcion para agregar y eliminar instruccioens
    function handleInstruction() {
        setInstructionList([...instructionList, {step: ''}])
    }
    function handleRemove (index) {
        const list = [...instructionList];
        list.splice(index, 1);
        setInstructionList(list)
    }
    
    // Funcion para tomar instrucciones
    function handleInstructionChange(e, index) {
        const { name, value} = e.target;
        const list = [...instructionList];
        list[index][name] = value;
        setInstructionList(list);
    }

    function handleSubmit(e) {
        e.preventDefault();
        input.extendedIngredients = ingredientList
        input.step_by_step = instructionList
        dispatch(createRecipe(input, history));
        alert('Receta Creada Satisfactoriamente');
        setInput({
            name: '',
            resume: '',
            health_score: 0,
            step_by_step: {},
            diets: [],
            image: '',
            extendedIngredients: {}
        })
    }

    function handleIngredient() {
        setIngredientsList([...ingredientList, {Ingredient: ''}])
    }
    function handleRemoveIngredient (index) {
        const list = [...ingredientList];
        list.splice(index, 1);
        setIngredientsList(list)
    }
    
    // Funcion para tomar instrucciones
    function handleIngredientChange(e, index) {
        const { name, value} = e.target;
        const list = [...ingredientList];
        list[index][name] = value;
        setIngredientsList(list);
    }


    return (
        <div>    
          
             <NavBar></NavBar>
    
            <h1>CREAR RECETA</h1>
            <div className='form-general'>
                <form onSubmit={(e) => handleSubmit(e)}>
                        <label>Name: </label>
                    <div>
                        <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={(e) => handleChange(e)}
                        placeholder='Name...'
                        className={errors.name && 'danger'}
                        />
                        {errors.name && (
                            <p className="error">{errors.name}</p>
                        )}
                    </div> 
                        <label>Resume: </label>
                    <div>
                        <input
                        type='text'
                        value={input.resume}
                        name='resume'
                        onChange={(e) => handleChange(e)}
                        placeholder='Resume...'
                        className={errors.resume && 'danger'}
                        />
                         {errors.resume && (
                            <p className="error">{errors.resume}</p>
                        )}
                    </div>     
                        <label>HealthScore: </label>
                    <div>
                        <input
                        type='text'
                        value={input.health_score}
                        name='health_score'
                        onChange={(e) => handleChange(e)}
                        className={ (errors.HealthscoreNotNum || errors.HealthscoreMaxMin || errors.HealthscoreNull) && 'danger'}
                        />
                         {errors.HealthscoreMaxMin && (
                            <p className="error">{errors.HealthscoreMaxMin}</p>
                        )}
                        {errors.HealthscoreNotNum && (
                            <p className="error">{errors.HealthscoreNotNum}</p>
                        )}
                        {errors.HealthscoreNull && (
                            <p className="error">{errors.HealthscoreNull}</p>
                        )}
                    </div>     

                    <div className="INGREDIENTS-INSTRUCCIONS">

                        <div className="INSTRUCCIONS">
                            <span>Instruction(s):</span>
                                {instructionList.map((singleInstruction, index) => {
                                    return (
                                        <div key = {index} className='INSTRUCTIONS'>
                                            <div>
                                                <span>Step {index + 1} : </span>
                                                <input name='step' onChange={(e) => handleInstructionChange(e, index) } value={singleInstruction.step}  ></input>
                                                {instructionList.length - 1 === index && instructionList.length < 4 && 
                                                <button type='button' className="add-btn" onClick={() => handleInstruction()}>Add</button>
                                                }
                                            </div>
                                            <div>
                                                {instructionList.length > 1 && 
                                                <button className="rmv-btn" type='button' onClick={(e) => handleRemove(index)}> Remove </button>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>

                        <div className="INGREDIENTS">
                            <span>Ingredients :</span>
                                {ingredientList.map((singleIngredient, index) => {
                                    return (
                                        <div key = {index} className='INSTRUCTIONS'>
                                            <div>
                                                <span>Ingredient : </span>
                                                <input name='Ingredient' onChange={(e) => handleIngredientChange(e, index) } value={singleIngredient.step}  ></input>
                                                {ingredientList.length - 1 === index && ingredientList.length < 4 && 
                                                <button type='button' className="add-btn" onClick={() => handleIngredient()}>Add</button>
                                                }
                                            </div>
                                            <div>
                                                {ingredientList.length > 1 && 
                                                <button className="rmv-btn" type='button' onClick={(e) => handleRemoveIngredient(index)}> Remove </button>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                    <div>
                        <label>Imagen: </label>
                        <input
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={(e) => handleChange(e)}
                        placeholder='put image..'
                        />
                    </div>    

                    <div className="diets">
                        <label> Select Diets </label>
                        {dietsfetched.map((diets) => {

                                return (                               
                                <label key= {diets.id} ><br></br><input
                                type='checkbox'
                                name='diets'
                                value={diets.id}
                                onChange={handleCheck}
                                ></input>{diets.name}</label>
                                
                                )
                            
                            })
                        }                 
                    </div>   
                    <br></br> 
                    <button type='submit'> CREAR RECETA </button> 
                </form>
            </div>

        </div>
    )
}