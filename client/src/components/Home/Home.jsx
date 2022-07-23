import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, fetchDiets, filteredRecipeByDiet, filterCreated, orderByName, orderByRate } from '../../redux/actions/index';
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

    //recetas renderizadas
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    //Orden para filtros
    const [orden, setOrden] = useState('')


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function handleClick() {
        dispatch(fetchRecipes())
    }

    function handleFilterRecipe(e) {
        dispatch(filteredRecipeByDiet(e.target.value))
        console.log(e.target.value)
        setCurrentPage(1);
    }

    function handleMyRecipes(e) {
        dispatch(filterCreated(e.target.value))
        console.log(e.target.value)
    }

    function handleOrderRate(e) {
        e.preventDefault();
        dispatch(orderByRate(e.target.value));
        setCurrentPage(1);
        setOrden(`${orden} + ${e.target.value}`);
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    //dispatchtoprops
    useEffect(() => {
        dispatch(fetchDiets());
        dispatch(fetchRecipes());   
    }, [])          

    

    return <div>
                <div className='conteiner-general'>
                    <div className='FILTERS'>

                        <button onClick={(e) => handleMyRecipes(e)}>
                            MIS RECETAS
                        </button>

                        <br></br>

                        ORDENAR POR NOMBRE
                        <select onChange={(e) => handleSort(e)}>
                            <option value= 'asc'> Ascendente </option>
                            <option value= 'dec'> Descendente </option>
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
                    
                        FILTRAR POR SALUDABLE
                        <select onChange={(e) => handleOrderRate(e)}>
                            <option hidden value > ORDENAR </option>
                            <option value= 'asc'> Ascendente </option>
                            <option value= 'des'> Descendente </option>
                        </select>

                        <br></br>

                    </div>
                    <div>
                        <div>
                            <button onClick={(e) => handleClick(e)}>
                                HOME
                            </button>
                            <br></br>
                            <Link to='/CreateRecipe'>
                            <button> CREAR RECETA </button>
                            </Link>
                            <br></br>
                            <NavBar></NavBar>
                        </div>
                        <div className='RECIPES_PER_PAGE'>
                            {/* mapeo el slice de recetas/recetas filtradas */}
                            {currentRecipes.map((recipe) => {  
                                return <Recipe 
                                        id = {recipe.id} 
                                        name = {recipe.name} 
                                        image = {recipe.image} 
                                        key = {recipe.id} 
                                        health_score = {recipe.health_score} 
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