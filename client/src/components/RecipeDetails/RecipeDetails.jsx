import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react';
import { fetchRecipeDetail } from '../../redux/actions/index';



export default function RecipeDetails(props) {

    const id = props.match.params.id
    let recipeDetails = useSelector(state => state.recipeDetails)

    let dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchRecipeDetail(id))
    }, [dispatch, id])

    console.log(recipeDetails)

    return (
        <div>
            {recipeDetails.name}
            <div>
                {recipeDetails.resume}
            </div>
            <div>
                <img src={recipeDetails.image} alt= 'imagen'></img>
            </div>
        </div>
    )
}