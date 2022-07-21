export const FETCH_RECIPE = 'FETCH_RECIPE'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const CREATE_RECIPE = 'CREATE_RECIPE'
export const FETCH_DIET = 'FETCH_DIET'

export function fetchRecipes() {
    return function(dispatch) {
        fetch('http://localhost:3001/api/Recipe')
        .then(resp => resp.json())
        .then((recipes) => {
            dispatch({
                type: FETCH_RECIPE,
                payload: recipes
            })
        })
        .catch(error => {
            console.log(error)
        })
        
    }
    
}

export function fetchDiets() {
    return async function(dispatch) {
        
        try {

            const fetchdiets = await fetch('http://localhost:3001/api/Diet')
    
            const diets = await fetchdiets.json()
    
            dispatch({
                type: FETCH_DIET,
                payload: diets,
            })
            
        } catch (error) {
            console.log(error)
        }

    }
}

export const createProduct = function(payload) {
    return {
      type:CREATE_RECIPE,
      payload: {...payload}
    }
  };
  
  
  export const deleteProduct = function(recipe) {
    return {
        type: DELETE_RECIPE,
        payload: recipe
    }
  };

