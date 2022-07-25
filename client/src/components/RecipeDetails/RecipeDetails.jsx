import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react';
import { fetchRecipeDetail } from '../../redux/actions/index';
import NavBar from "../NavBar/NavBar";
import './RecipeDetails.css'



export default function RecipeDetails(props) {

    const id = props.match.params.id
    
    let recipeDetails = useSelector(state => state.recipeDetails)
    
    let dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchRecipeDetail(id))
    }, [dispatch, id])


    return (
        <div>
            <NavBar></NavBar>
            <div className="conteiner">

                <div className="INGREDIENTS">
                    <span>Ingredients:</span>
                    <details>
                        <summary></summary>
                        <ul>
                        {recipeDetails.extendedIngredients?.map((ingredients, index) => {
                            return (
                                    <li key={index} >{ingredients}</li>
                                    )
                                })}
                         </ul>

                    </details>
                </div>

                <div>
                    <div>
                        <h1>{recipeDetails.name}</h1>
                    </div>
                    <div className="imgandicons">
                        <div>
                            <img src={recipeDetails.image} alt= 'imagen' className="image"></img>
                        </div>
                        <div>
                            {recipeDetails.diets?.map(diet => {
                                return <div key={diet}> {diet} </div>
                            })}

                            <div>
                                {recipeDetails.health_score}
                            </div>
                        </div>
                    </div>
                    <p>
                    {/* {replace para sacar el href} */}
                    {recipeDetails.resume?.replace(/<[^>]+>/g, '')}
                    </p>
                    
                    <div>
                        {recipeDetails.step_by_step?.map((step) => {
                            return (
                                <div key = {step.number}>
                                    <h1>Step {step.number} </h1>
                                    <p> {step.step} </p>
                                </div>
                            )
                        })}
                        ACA VAN LOS PASO A PASO.
                    </div>

                </div>
            </div>
        </div>
    )
}