import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, fetchDiets, filteredRecipeByDiet, order, filterCreated  } from '../../redux/actions/index';
import Recipe from '../recipe/recipe';
import Paginado from '../Paginado/Paginado';
import NavBar from '../NavBar/NavBar';
import './Home.css'
import { Recipefav } from '../RecipeFav/Recipefav';
import NotFound from '../diet-icons/icons/NotFound'



export default function Home() {
    let dispatch = useDispatch();
    
    //statetoprops
    let recipes = useSelector(state => state.recipes)
    let diets = useSelector(state => state.diets)
    let Allrecipes = useSelector(state => state.Allrecipes)
    let favrecipes = useSelector(state => state.favorites)
    let Myrecipes = useSelector(state => state.Myrecipes)
    
    
    //Paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    
    const [onlyfavs, setOnlyFavs] = useState(false)
    const [onlyMy, setOnlyMy] = useState(false)
    //recetas filtradas por pagina
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    const [render, setRender] = useState('')
    

    const recipeCheckboxes = document.querySelectorAll('input[type="checkbox"]')

    function handleCheck(e) {
        let dietsToFilter = []
        recipeCheckboxes.forEach(checkbox => {
            if(checkbox.checked) {
                dietsToFilter.push(checkbox.value.toLowerCase())
            }
        })
        filterbydiet(dietsToFilter)
    }

    function filterbydiet(diets) {
        dispatch(filteredRecipeByDiet(diets));
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
  
    function refresh(){
        window.location.reload("Refresh")
    }

    function handleMyRecipes(e) {
        if(!onlyMy) {
            setOnlyMy(true)
            setOnlyFavs(false)
            dispatch(filterCreated())
            setCurrentPage(1)
        } else {
            setOnlyMy(false);
            setOnlyFavs(false);
            setCurrentPage(1);
        }
    }

    function handleFavorites() {
        if(!onlyfavs) {
            setOnlyFavs(true);
            setOnlyMy(false)
            setCurrentPage(1);
        } else {
            setOnlyFavs(false);
            setOnlyMy(false)
            setCurrentPage(1)
        }
    }
    

    function onSearch(name) {
        dispatch(fetchRecipes(name))
        setCurrentPage(1)
    }
    //dispatchtoprops
    useEffect(() => {
        if(Allrecipes.length === 0) {
            dispatch(fetchDiets());
            dispatch(fetchRecipes());   
        }
    }, [dispatch])          

return <div className='WHOLE-PAG'>
                <div className='conteiner-general'>

                    <div className='CONTEINER-NAV'>
                        <NavBar validate={true} onSearch={onSearch}></NavBar>
                    </div>
                    <div className='FILTERS_AND_RECIPES'>
                        <div className='FILTERS'>
                            {
                            !onlyMy && !onlyfavs ?
                                <div className='FIXED-FILTER'>
                                        <div className='FILTER-NAME'>
                                        <span> Search by : </span>
                                        </div>
                                                
                                        <div className='ORDER-RECIPES'>
                                            <span> Name/Rate </span>
                                            <select className='SELECT-ORDER' id='orderBy' onChange={(e) => handleSort(e)} defaultValue='orderBy'>
                                                <option value= 'name'> Name </option>
                                                <option value= 'health_score'> Rate </option>
                                            </select>                                                             
                                            <span>In What Order ?</span>
                                            <select className='SELECT-ORDER' id='orderType' onChange={(e) => handleSort(e)} defaultValue='orderType'>
                                                <option value= 'asc'> Ascendent </option>
                                                <option value= 'des'> Descendent </option>
                                            </select>
                                        </div>  
                                        <div>
                                            <details className='DETAILS-RECIPES' open>
                                                <summary className='SUMMARY-RECIPES'> Recipes: </summary>
                                                
                                                {diets?.map((diets) => {
                                                    return (
                                                        <label className='LABEL-DIET' key= {diets.id} ><br></br><input
                                                        key= {diets.name}
                                                        type='checkbox'
                                                        name='diets'
                                                        value={diets.name}
                                                        onClick={e => handleCheck(e)}
                                                        ></input>{diets.name}</label>
                                                    )
                                                })}
        
                                            </details >
                                        </div>
                                        {
                                            onlyMy ?
                                            <button className='MY-RECIPE' onClick={(e) => handleMyRecipes(e)}>
                                                All recipes
                                            </button>
                                            :
                                            <button className='MY-RECIPE' onClick={(e) => handleMyRecipes(e)}>
                                                My Recipes
                                            </button>
                                        }
                                        
                                        {
                                            onlyfavs ?
                                            <button className='MY-RECIPE' onClick={(e) => handleFavorites(e)}>
                                                All recipes
                                            </button>
                                            :
                                            <button className='MY-RECIPE' onClick={(e) => handleFavorites(e)}>
                                                Favorites
                                            </button>
                                        }

                                </div>
                            :
                                <div className='FIXED-FILTER'> 
                                    {
                                        onlyMy ?
                                        <button className='MY-RECIPE' onClick={(e) => handleMyRecipes(e)}>
                                            All recipes
                                        </button>
                                        :
                                        <button className='MY-RECIPE' onClick={(e) => handleMyRecipes(e)}>
                                            My Recipes
                                        </button>
                                    }
                                        
                                    {
                                        onlyfavs ?
                                        <button className='MY-RECIPE' onClick={(e) => handleFavorites(e)}>
                                            All recipes
                                        </button>
                                        :
                                        <button className='MY-RECIPE' onClick={(e) => handleFavorites(e)}>
                                            Favorites
                                        </button>
                                    }     
                                </div>
                            }

                            </div>

                        <div className='RECIPES-CONTEINER'> 
                            {  !Allrecipes.length ?
                                <div className='LOADING'>
                                    <span className="loader"></span> 
                                </div>
                                :
                                recipes.length ?
                                <div className='RECIPES-CONTEINER' >
                                    {
                                        !onlyMy && !onlyfavs ?
                                        <div className='PAGINADO'>
                                            <Paginado
                                            recipesPerPage = {recipesPerPage}
                                            allRecipes = {recipes.length}
                                            paginado = {paginado}
                                            /> 
                                        </div>
                                        :
                                        null
                                    }

                                    { 
                                        onlyfavs ?
                                            favrecipes.length ?
                                                favrecipes?.map((recipe) => {  
                                                    return (
                                                                <Recipe 
                                                                recipe={recipe}
                                                                key={recipe.id}
                                                                favrecipes={favrecipes}
                                                                />
                                                                
                                                            )
                                                })
                                                :
                                                <div className='NOT-FOUND-ICON'>
                                                    <NotFound></NotFound>
                                                    <button className='SUBMIT-RECIPE' onClick={refresh}>VOLVER A INTENTAR</button>
                                                 </div>
                                        :
                                        onlyMy ?
                                            Myrecipes.length?
                                                Myrecipes.map((recipe) => {  
                                                    return (
                                                                <Recipe 
                                                                recipe={recipe}
                                                                key={recipe.id}
                                                                favrecipes={favrecipes}
                                                                />
                                                                
                                                            )
                                                })   
                                                :
                                                <div className='NOT-FOUND-ICON'>
                                                    <NotFound></NotFound>
                                                    <button className='SUBMIT-RECIPE' onClick={refresh}>VOLVER A INTENTAR</button>
                                                </div>  
                                        :
                                        currentRecipes.map((recipe) => {  
                                            return (
                                                        <Recipe 
                                                        recipe={recipe}
                                                        key={recipe.id}
                                                        favrecipes={favrecipes}
                                                        />
                                                        
                                                    )
                                        }) 

                                    }    
                                </div> 
                                :
                                <div className='NOT-FOUND-ICON'>
                                    <NotFound></NotFound>
                                    <button className='SUBMIT-RECIPE' onClick={refresh}>VOLVER A INTENTAR</button>
                                </div>
                            } 
                            
                                <div className='CARROUSEL'>
                                
                                    <div className='favss'>
                                        {Allrecipes.length ?
                                            <span className='POPULARS'> MOST POPULARS </span> 
                                            :
                                            null
                                        }
                                        <div className='favs'>
                                            {Allrecipes?.map(recipe => {
                                                if(recipe.veryPopular) {
                                                    return (
                                                            <Recipefav 
                                                            recipe={recipe}
                                                            key={recipe.id}/>
                                                    )
                                                }
                                                
                                            })}
                                        </div>  
                                    </div>

                                </div>
                        
                        </div>
                    </div>
            </div>
        </div>

}