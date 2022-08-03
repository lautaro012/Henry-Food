import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, fetchDiets } from "../../redux/actions";
import { useEffect } from "react";
import './CreateRecipe.css'
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import RecipeName from '../diet-icons/icons/RecipeName'



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
        if(dietsfetched.length === 0){
            dispatch(fetchDiets());
        }
        // dispatch(fetchRecipes());
    }, [dispatch])
    
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
        setInstructionList([...instructionList, {Step: ''}])
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
            health_score: 1,
            step_by_step: {},
            diets: [],
            image: '',
            extendedIngredients: {}
        })
        console.log('EL INPUT ES:', input)
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
        <div className="FORM">    
          
             <NavBar validate={false} ></NavBar>
     
            <div className='form-general'>
                <RecipeName width={200} height={200} className='ICON-RECIPE'/>
                <div className="RECIPE-ICON">
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className='FORMULARY'>
                       
                    <div className="FORM-NAME">
                        
                        <div className={errors.name && 'danger'}>
                            <input
                            type='text'
                            value={input.name}
                            name='name'
                            onChange={(e) => handleChange(e)}
                            placeholder='Name...'
                            className= 'FORM-INPUT'
                            />
                            {errors.name && (
                                <p className="error">{errors.name}</p>
                            )}
                        </div>
                    </div> 
                         <label>Resume: </label>
                    <div className={errors.resume && 'danger'}>
                        <textarea
                        type='text'
                        value={input.resume}
                        name='resume'
                        onChange={(e) => handleChange(e)}
                        placeholder='...'
                        className='FORM-RESUME'
                        required rows='5' 
                        cols='40'
                        />
                         {errors.resume && (
                            <p className="error">{errors.resume}</p>
                        )}
                    </div>     

                    <div className="INGREDIENTS-INSTRUCCIONS">

                        <div className="FORM-INSTRUCCIONS">
                            <span>Instruction(s):</span>
                                {instructionList.map((singleInstruction, index) => {
                                    return (
                                        <div key = {index} >
                                            <div className='INSTRUCTIONS'>
                                                <span>Step {index + 1} :</span>
                                                <input className="INPUT-STEPS" name='Step' onChange={(e) => handleInstructionChange(e, index) } value={singleInstruction.Step}  ></input>
                                            <div className="INSTRUCTIONS-BTNS">
                                                {instructionList.length - 1 === index && instructionList.length < 4 && 
                                                <button type='button' className="add-btn" onClick={() => handleInstruction()}>Add</button>
                                                }
                                                {instructionList.length > 1 && 
                                                <button className="rmv-btn" type='button' onClick={(e) => handleRemove(index)}> Rmv </button>
                                                }
                                            </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>

                        <div className="FORM-INGREDIENTS">
                            <span>Ingredients :</span>
                                {ingredientList.map((singleIngredient, index) => {
                                    return (
                                        <div key = {index} >
                                            <div className='INSTRUCTIONS'>
                                                <input className="INPUT-STEPS" name='Ingredient' onChange={(e) => handleIngredientChange(e, index) } value={singleIngredient.Ingredient}  ></input>
                                            <div className="INSTRUCTIONS-BTNS">
                                                {ingredientList.length - 1 === index && ingredientList.length < 4 && 
                                                <button type='button' className="add-btn" onClick={() => handleIngredient()}>Add</button>
                                                }
                                                {ingredientList.length > 1 && 
                                                <button className="rmv-btn" type='button' onClick={(e) => handleRemoveIngredient(index)}> Rmv </button>
                                                }
                                            </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                    <div className="FORM-IMG-HS">
                        <div className="FORM-IMG">
                            <span>Image URL :   </span>
                            <input
                            type='text'
                            value={input.image}
                            name='image'
                            onChange={(e) => handleChange(e)}
                            placeholder='Copy the image here...'
                            />
                        </div>    
                        <div className={ (errors.HealthscoreNotNum || errors.HealthscoreMaxMin || errors.HealthscoreNull) && 'danger' && 'DANGER'}>
                            <label>HealthScore: </label>
                            <input
                            type='number'
                            value={input.health_score}
                            name='health_score'
                            onChange={(e) => handleChange(e)}
                            className= 'INPUT-HS'
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
                    </div>


                        <label> Select Diets </label>                           
                    <div className="FORM-DIETS">
                        {dietsfetched.map((diets) => {

                                return (                               
                                <label key= {diets.id} className='FORM-DIET-LABEL'><br></br><input
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
                
                    { Object.keys(errors).length ? 
                        <button type='submit'   className='SUBMIT-RECIPE-ERROR' disabled > CREAR RECETA </button> :
                        <button type='submit'   className='SUBMIT-RECIPE'> CREAR RECETA </button> 
                    }
                    
                </form>
           
           
            </div>

   

        </div>
    )
}