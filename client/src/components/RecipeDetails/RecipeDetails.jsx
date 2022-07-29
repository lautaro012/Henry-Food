import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react';
import { fetchRecipeDetail } from '../../redux/actions/index';
import NavBar from "../NavBar/NavBar";
import './RecipeDetails.css'
import * as icons from '../diet-icons/DietIcons'
import Hand from '../diet-icons/icons/Hand'
import Heart from '../diet-icons/icons/Heart'

require('dotenv').config();
const {
  REACT_APP_API
} = process.env;



export default function RecipeDetails(props) {
    console.log(process.env)   
    console.log(REACT_APP_API) 


    const id = props.match.params.id
    
    let recipeDetails = useSelector(state => state.recipeDetails)
    console.log(recipeDetails)
    let dispatch = useDispatch()
    console.log(recipeDetails)
    useEffect(() => {
        dispatch(fetchRecipeDetail(id))
    }, [dispatch, id])

    const components = {
        glutenfree: icons.Glutenfree,
        dairyfree: icons.Dairyfree,
        ketogenic: icons.Keto,
        lactoovovegetarian: icons.Lactovoveg,
        vegan: icons.Vegan,
        pescatarian: icons.Pesca,
        paleolithic: icons.Paleo,
        primal: icons.Primal,
        fodmapfriendly: icons.Fodmap,
        whole30: icons.Whole
    }


 
    return (
        <div className="background">
            <div className='CONTEINER-NAV'>
                <NavBar></NavBar>
            </div>

            <div className="INGREDIENTS-RECIPE-EMPTY">
                <div className="INGREDIENTS-CONTEINER">
                    <div className="INGREDIENTS">
                        <summary>Ingredients:</summary>
                        <ul className="LIST-OF-INGREDIENTS">
                        { id.length > 8 ?
                            recipeDetails.extendedIngredients === {} ?
                            <p className="STEPS-WRITED"> There are no Ingredients.</p>
                            :
                            recipeDetails.extendedIngredients?.map((ingredients, index) => {
                                return (
                                        <li key={index} >{JSON.parse(ingredients).Ingredient}</li>
                                        )
                                    })
                            :
                        recipeDetails.extendedIngredients?.map((ingredients, index) => {
                            return (
                                    <li key={index} >{ingredients}</li>
                                    )
                                })         
                            }     
                         </ul>

                    </div>
                </div>
                <div className="RECIPE-DETAILS">
                    <div className="CARD-DETAILS">
                        <div className="DETAILS">
                            <div className="IMAGE-DET">
                                <img src={recipeDetails.image} alt= 'imagen' className="IMAGE-DETAIL"></img>
                            </div>
                            <div className="BESIDE-IMG">
                                <div className="NAME-SCORE">
                                    <div className="SCORE">
                                        <div className="NUMBER-HRT">
                                        <span>{recipeDetails.health_score}  </span>
                                        <Heart fill={"#dd5d26"} className='HEART'/>
                                        </div>
                                        <Hand fill={"#dd5d26"} className='HAND'/>
                                    </div>
                                    <div className="NAME">  
                                        <h1 >{recipeDetails.name}</h1>
                                    </div>
                                </div>
                                <div className="SHOW-DIETS">
                                    {recipeDetails.diets?.map((diet, index) => {
                                        const SpecificImg = components[diet.replace(/\s+/g, '')]
                                        return (
                                            <div className='box-diet'>
                                                {SpecificImg ? 
                                                <SpecificImg width={64} height={64} fill={"#dd5d26"}/>
                                                : null}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                            <div className="SHOW-RESUME">
                                <p className="STEPS-WRITED">
                                 {/* {replace para sacar el href} */}
                                 {recipeDetails.resume?.replace(/<[^>]+>/g, '')}
                                </p>
                            </div>
                    </div>

                    <div className="STEPS">
                        { id.length < 8 ?
                            typeof recipeDetails.step_by_step === 'string' ?
                                <div className="STEPS-WRITED"> {recipeDetails.step_by_step} </div>
                                :
                                recipeDetails.step_by_step?.map((step) => {
                                    return ( 
                                        <div key = {step.number}>
                                            <h1>Step {step.number} </h1>
                                            {step.step ? 
                                            <p className="STEPS-WRITED"> {step.step} </p> :
                                            <p className="STEPS-WRITED"> {step} </p>
                                        }
                                        </div>
                                        )})
                                        :
                                        recipeDetails.step_by_step?.map((step, index) => {
                                            return ( 
                                                <div key = {index}>
                                                    <h1>Step {index + 1} </h1>
                                                    <p className="STEPS-WRITED"> {JSON.parse(step).Step} </p>
                                                </div>
                                            )
                                        }) 
                            }
                    </div>
                </div>
                <div className="EMPTY">
                </div>
            </div>
        </div>
    )
}