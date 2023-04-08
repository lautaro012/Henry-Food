export const FETCH_RECIPE = 'FETCH_RECIPE'
export const FETCH_RECIPE_NAME = 'FETCH_RECIPE_NAME'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const CREATE_RECIPE = 'CREATE_RECIPE'
export const FETCH_DIET = 'FETCH_DIET'
export const FILTER_BY_DIET = 'FILTER_BY_DIET'
export const FILTER_CREATED = 'FILTER_CREATED'
export const FETCH_DETAILS = 'FETCH_DETAILS'
export const ORDER = 'ORDER'
export const FILTER_BY_CHEAP = 'FILTER_BY_CHEAP'
export const FILTER_BY_DISH = 'FILTER_BY_DISH'
export const CLEAR = 'CLEAR'
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORTES = 'REMOVE_FROM_FAVORITES'



require('dotenv').config();
const {
  REACT_APP_API
} = process.env;


export function fetchRecipes(name) {
    if(name) {
        return function(dispatch) {
            // fetch('http://localhost:3001/api/Recipe?name=' + name)

            fetch(`${REACT_APP_API}/api/Recipe?name=`+name )
            .then(resp => resp.json())
            .then(recipes => {
                dispatch({
                    type: FETCH_RECIPE_NAME,
                    payload: recipes
                })
            })
            .catch(error => console.log(error))
        }
    } else {
        return function(dispatch) {
            // fetch('http://localhost:3001/api/Recipe')
            fetch(`henry-food-production.up.railway.app/api/Recipe`)
            .then(resp => resp.json())
            .then((recipes) => {
                console.log(REACT_APP_API, 'react app api')        
                console.log(recipes, 'recetas')     
                dispatch({
                    type: FETCH_RECIPE,
                    payload: recipes[0]
                })
            })
            .catch(error => {
                
                console.log(error)
            })
            
        }
    }
    
}



export function fetchRecipeDetail(id) {
    return function(dispatch) {
        
        try {
            if(typeof id === 'string') {
                // fetch(`http://localhost:3001/api/Recipe/${id}`)

                fetch(`${REACT_APP_API}/api/Recipe/${id}`)
                .then(res => res.json())
                .then(recipe => {
                    
                    dispatch({
                        type: FETCH_DETAILS,
                        payload: recipe
                    })
                })
            } 
        } catch (error) {
            console.log(error)
        }


    }
}

export function fetchDiets() {
    return function(dispatch) {
        
        try {
            
            // fetch('http://localhost:3001/api/Diet')
            fetch(`${REACT_APP_API}/api/Diet`)
                .then(res => res.json())
                .then(diets => {
                    dispatch({
                        type: FETCH_DIET,
                        payload: diets,
                    })
                }) 

        } catch (error) {
            console.log(error)
        }

    }
}

export const createRecipe = function(payload, history) {
    return function(dispatch) {
        try {
            // fetch('http://localhost:3001/api/Recipe', {
            fetch(`${REACT_APP_API}/api/Recipe`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(payload)
    
            })
            .then(response => response.json())
            .then(recipe => {
               
                let promises = payload.diets.map(diet => {
                    // return fetch(`http://localhost:3001/api/Recipe/${recipe.id}/diet/${diet}`, {
                    return fetch(`${REACT_APP_API}/api/Recipe/${recipe.id}/diet/${diet}` , {    
                        method: 'POST'
                    })
                })

                Promise.all(promises).then(
                    dispatch({
                        type:CREATE_RECIPE,
                        payload: recipe
                    })
                )
                history.push("/Recipe/" + recipe.id)
            })
            
        } catch (error) {
            console.log('error PORQUE:' + error)
        }
    }

    
  };
  
  
// export const filterRecipeByCheap = function(payload) {
//     return {
//         type: FILTER_BY_CHEAP,
//         payload
//     }
// }

  export const filteredRecipeByDiet = function(payload) {
    return {
        type: FILTER_BY_DIET,
        payload
    }
  }

  export const filterCreated = function(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
  }

  export const order = function(payload) {
    return {
        type: ORDER,
        payload
    }
  }

export const deleteRecipe = function(payload) {
    return async function(dispatch) {
        console.log('Llego al action')
        await fetch(`http://localhost:3001/api/recipe/${payload}`, {
            method: 'DELETE'
        })
        dispatch({
            type: DELETE_RECIPE, 
            payload
        })
    }
}

export const addToFavorites = function(payload) {
    return {
        type: ADD_TO_FAVORITES,
        payload
    }
}

export const removeFromFavorites = function(payload) {
    return {
        type: REMOVE_FROM_FAVORTES,
        payload
    }
}

export const clear = function() {
    return {
        type: CLEAR
    }
}