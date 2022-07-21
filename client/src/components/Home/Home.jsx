import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, fetchDiets } from '../../redux/actions/index';
import Recipe from '../recipe/recipe';
import Paginado from '../Paginado/Paginado';

export default function Home() {
    
        let dispatch = useDispatch();
        
        //statetoprops
        let recipes = useSelector(state => state.recipes)
        let diets = useSelector(state => state.diets)

    //Paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)



    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    //dispatchtoprops
    useEffect(() => {
        dispatch(fetchRecipes());
        dispatch(fetchDiets());
    }, [dispatch])

    return <div>
                <div>
                    <select>
                        <option value= 'asc'> Ascendente </option>
                    </select>
                    <select> 
                        <option>Descendente</option>   
                    </select>
                    <select>
                        <option> Rate </option> 
                    </select>
                </div>
                <div>
                <Paginado
                recipesPerPage = {recipesPerPage}
                allRecipes = {recipes.length}
                paginado = {paginado}
                />
                </div>
                {recipes.map((recipe) => {  
                    return <Recipe name = {recipe.name} image = {recipe.image} id = {recipe.id} health_score = {recipe.health_score} />
                }) }
              
        </div>
}