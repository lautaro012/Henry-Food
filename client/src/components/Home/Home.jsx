import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, fetchDiets, filteredRecipeByDiet, order, filterCreated, filterByDish  } from '../../redux/actions/index';
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

    //Paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage

    //recetas filtradas por pagina
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const [render, setRender] = useState('')
    var dietsToFilter = []

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function handleCheck(e) {
        if(e.target.checked){
            dietsToFilter.push(e.target.value)
        } 
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

    //dispatchtoprops
    useEffect(() => {
        dispatch(fetchDiets());
        dispatch(fetchRecipes());   
    }, [dispatch])          

    function refresh(){
        window.location.reload("Refresh")
      }

    return <div className='WHOLE-PAG'>
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
                                            <label key= {diets.id} ><br></br><input
                                            key= {diets.name}
                                            type='checkbox'
                                            name='diets'
                                            value={diets.name}
                                            onClick={handleCheck}
                                            ></input>{diets.name}</label>
                                        )
                                        })}

                                    </details >
                                </div>

                                <button className='SUBMIT-RECIPE' onClick={(e) => handleMyRecipes(e)}>
                                    MIS RECETAS
                                </button>
                            </div>

                        </div>
                    
                    
                        {  !Allrecipes.length ?
                            <div className='LOADING'>
                                <span className="loader"></span> 
                            </div>
                            :
                            recipes.length ?
                            <div className='RECIPES-CONTEINER' >
                                {/* 312 x 213 */}
                                { 
                                    currentRecipes.map((recipe) => {  
                                        return <Recipe 
                                                recipe={recipe}
                                                key={recipe.id}
                                                />
                                    }) 
                                }       
                                 { !currentRecipes.length < 5 ?
                                        <Paginado
                                        recipesPerPage = {recipesPerPage}
                                        allRecipes = {recipes.length}
                                        paginado = {paginado}
                                        /> :
                                        null
                                    }    
                            </div> 
                            :
                            <div className='NOT-FOUND-ICON'>
                                 <NotFound></NotFound>
                                NO SE ENCONTRARON RECETAS
                                <button className='SUBMIT-RECIPE' onClick={refresh}>VOLVER A INTENTAR</button>
                             </div>
                        }                           
                        </div>
 
 
                    { recipes.length ?
                        <div className='favs'>
                            <span className='POPULARS'> MOST POPULARS </span> 
                            {recipes?.map(recipe => {
                                if(recipe.veryPopular) {
                                    return <Recipefav 
                                            recipe={recipe}
                                            key={recipe.id}/>
                                }
                            })}
                        </div>  
                        :        
                        null
                    
                    }
            </div>
        </div>

}