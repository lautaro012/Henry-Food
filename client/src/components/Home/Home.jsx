import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, fetchDiets, filteredRecipeByDiet, order  } from '../../redux/actions/index';
import Recipe from '../recipe/recipe';
import Paginado from '../Paginado/Paginado';
import NavBar from '../NavBar/NavBar';
import './Home.css'

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

    //recetas filtradas por pagina
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const [render, setRender] = useState('')


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    function handleFilterRecipe(e) {
        dispatch(filteredRecipeByDiet(e.target.value))
        // console.log(e.target.value)
        setCurrentPage(1);
    }



    function handleSort(e) {
        e.preventDefault();
        let orderBy = document.getElementById('orderBy').value
        let orderType = document.getElementById('orderType').value
        dispatch(order({orderBy : orderBy, orderType: orderType}));
        setCurrentPage(1);
        setRender(`${render} renderizado`);
    }

    //dispatchtoprops
    useEffect(() => {
        dispatch(fetchDiets());
        dispatch(fetchRecipes());   
    }, [dispatch])          

    

    return <div>
                <div className='conteiner-general'>
                    <NavBar></NavBar>
                    <div className='FILTERS_AND_RECIPES'>
                        <div className='FILTERS'>
                            ORDENAR POR 
                            <select id='orderBy' onChange={(e) => handleSort(e)} defaultValue='orderBy'>
                                <option value= 'name'> Nombre </option>
                                <option value= 'health_score'> Rate </option>
                            </select>
                        
                            <br></br>
                        
                            EN ORDEN
                            <select id='orderType' onChange={(e) => handleSort(e)} defaultValue='orderType'>
                                <option value= 'asc'> Ascendente </option>
                                <option value= 'des'> Descendente </option>
                            </select>
    
                                <br></br>
                            FILTRAR POR RECETA
                            <select onChange={(e) => handleFilterRecipe(e)} >
                                <option value= 'all'> Todas </option>
                            {diets?.map(diet => {
                                return (
                                    <option value={diet.name} key = {diet.id}>
                                        {diet.name}
                                    </option>
                                )
                            })}
                            </select>
                        
                            <br></br>   
                        

                        </div>
                        <div className='RECIPES_CONTEINER' >
                            {/* mapeo el slice de recetas/recetas filtradas */}
                            {currentRecipes.map((recipe) => {  
                                return <Recipe 
                                        recipe={recipe}
                                        key={recipe.id}
                                        />
                            }) }    
                        </div>
                    </div>
            </div>



                <Paginado
                recipesPerPage = {recipesPerPage}
                allRecipes = {recipes.length}
                paginado = {paginado}
                />

        </div>
}