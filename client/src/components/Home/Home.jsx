import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, fetchDiets, filteredRecipeByDiet, order, filterCreated, filterByDish  } from '../../redux/actions/index';
import Recipe from '../recipe/recipe';
import Paginado from '../Paginado/Paginado';
import NavBar from '../NavBar/NavBar';
import './Home.css'
import { Recipefav } from '../RecipeFav/Recipefav';


export default function Home() {
    
    let dispatch = useDispatch();
        
     //statetoprops
    let recipes = useSelector(state => state.recipes)
    let diets = useSelector(state => state.diets)
    let dish = useSelector(state => state.dish)
    

    //Paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage

    //recetas filtradas por pagina
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const [render, setRender] = useState('')
    var dietsToFilter = []
    var dishToFilter = []

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function handleCheck(e) {
        if(e.target.checked){
            dietsToFilter.push(e.target.value)
        } 
        console.log(dietsToFilter)
        if(!e.target.checked) {
            dietsToFilter = dietsToFilter.filter(diet => diet !== e.targe.value)
        }
        filterbydiet(dietsToFilter)
    }

    function filterbydiet(diets) {
        dispatch(filteredRecipeByDiet(diets));
        setCurrentPage(1);
    }

    function handleMyRecipes(e) {
        dispatch(filterCreated(e.target.value))
        // console.log(e.target.value)
    }

    function handleSort(e) {
        e.preventDefault();
        let orderBy = document.getElementById('orderBy').value
        let orderType = document.getElementById('orderType').value
        dispatch(order({orderBy : orderBy, orderType: orderType}));
        setCurrentPage(1);
        setRender(`${render} renderizado`);
    }

    function handleCheckDish(e) {
        if(e.target.checked){
            dishToFilter.push(e.target.value)
        } 
        if(!e.target.checked) {
            dishToFilter = dishToFilter.filter(dish => dish !== e.target.value)
        }

        filteredByDish(dishToFilter)
    }
    
    function filteredByDish(diets) {
        dispatch(filterByDish(diets));
        setCurrentPage(1);
    }

    //dispatchtoprops
    useEffect(() => {
        dispatch(fetchDiets());
        dispatch(fetchRecipes());   
    }, [dispatch])          

    function refresh(){
        window.location.reload("Refresh")
      }

    return <div>
                <div className='conteiner-general'>

                    <div className='CONTEINER-NAV'>
                        <NavBar></NavBar>
                    </div>

                    <div className='FILTERS_AND_RECIPES'>


                        <div className='FILTERS'>
                        <div className='FIXED-FILTER'>
                        <div className='FILTER-NAME'>
                        <span> Search by : </span>
                        </div>
                    
                        <details>
                          
                          
                            <summary> Name/Rate </summary>
                            <select id='orderBy' onChange={(e) => handleSort(e)} defaultValue='orderBy'>
                                <option value= 'name'> Nombre </option>
                                <option value= 'health_score'> Rate </option>
                            </select>
                            <br>
                            </br>
                           
                           
                            <span>In What Order ?</span>

                                <select id='orderType' onChange={(e) => handleSort(e)} defaultValue='orderType'>
                                    <option value= 'asc'> Ascendente </option>
                                    <option value= 'des'> Descendente </option>
                                </select>

                        </details>  

                        
                        <p> Filter by : </p>
                            <br></br>
                            <details>
                                <summary> Recipes: </summary>
                                
                                {diets?.map((diets) => {
                                return (
                                    <label key= {diets.id} ><br></br><input
                                    key= {diets.name}
                                    type='checkbox'
                                    name='diets'
                                    value={diets.name}
                                    onClick={handleCheck}
                                    ></input>{diets.name}</label>
                                )
                                })}

                        </details>
                        
                        <details>
                            <summary> Dish Types: </summary>

                            {dish?.map((dish) => {
                                    return (
                                        <label ><br></br><input
                                        
                                        type='checkbox' 
                                        name='dish'
                                        value={dish}
                                        onChange={handleCheckDish}
                                        ></input>{dish}</label>
                                    )
                                    })}
                        </details>  

                        <button onClick={(e) => handleMyRecipes(e)}>
                            MIS RECETAS
                        </button>
                        
                     

                        </div>


                        </div>


                        <div className='RECIPES-CONTEINER' >
                            {/* 312 x 213 */}
                        
                            { currentRecipes.length ?
                                currentRecipes.map((recipe) => {  
                                    return <Recipe 
                                            recipe={recipe}
                                            key={recipe.id}
                                            />
                                }) :
                                <div>
                                    NO SE ENCONTRARON RECETAS
                                    <button onClick={refresh}>VOLVER A INTENTAR</button>
                                </div>
                            
                            }    
                        
                        </div>
                    </div>
            </div>


            { currentRecipes.length ?
                <Paginado
                recipesPerPage = {recipesPerPage}
                allRecipes = {recipes.length}
                paginado = {paginado}
                /> :
                null
            }    
               
            { recipes.length ?
                <h2> RECETAS POPULARES </h2> :
                null
            }
            <div className='favs'>
                {recipes?.map(recipe => {
                    if(recipe.veryPopular) {
                        return <Recipefav 
                                recipe={recipe}
                                key={recipe.id}/>
                    }
                })}
            </div>              


        </div>
}