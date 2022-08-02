import { CREATE_RECIPE, FETCH_DETAILS, 
        FETCH_DIET, 
        FETCH_RECIPE, 
        FETCH_RECIPE_NAME, 
        // FILTER_BY_CHEAP, 
        FILTER_BY_DIET, 
        FILTER_CREATED, 
        ORDER,
        // FILTER_BY_DISH,
        CLEAR,
        DELETE_RECIPE,
        ADD_TO_FAVORITES,
        REMOVE_FROM_FAVORTES

        } from "../actions";


const initialState = {
    recipes: [],
    Allrecipes: [],
    diets: [],
    recipeDetails: {},
    favorites: [],
    Myrecipes: []
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        
        case FETCH_RECIPE:
            return {
                ...state,
                recipes: action.payload,
                Allrecipes: action.payload
            }
            
        case FETCH_RECIPE_NAME:
            return {
                ...state,
                recipes:action.payload
            }

        case FETCH_DETAILS:

            return {
                ...state,
                recipeDetails: action.payload
            }

        case FETCH_DIET:

            return {
                ...state,
                diets: action.payload
            }

        case CREATE_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
                // Allrecipes: [...state.Allrecipes, action.payload]
            }

        case FILTER_BY_DIET:
            // FILTRO POR DIETAS CON LOS VALUE
            const allrecipes = state.Allrecipes
            const specificDiet = action.payload
            let recipesToFilter= state.recipes
                const statusFiltered = 
                specificDiet.length === 0 ? 
                allrecipes     
                : 
                recipesToFilter.filter(recipe => {
                    for (let i = 0; i < specificDiet.length; i++) {      
                        if(recipe.diets.includes(specificDiet[i].toLowerCase()) || recipe.diets.includes(specificDiet[i])) {
                            return recipe
                        }
                    }
                    return console.log('Receta filtrada con exito')
                }) 
    
                return {
                    ...state,
                    recipes: statusFiltered
                }
            
          
        case FILTER_CREATED:
            
            //FILTRA MIS RECETAS SOBRE EL FILTRO DE DIETA. NO SOBRE EL DE TODAS LAS RECETAS        
                const myRecipes = state.recipes.filter(recipe => {
                    if(typeof recipe.id === 'string') return recipe;
                    return console.log('Receta propia filtrada con exito')
                }) 
                return {
                    ...state,
                    Myrecipes: myRecipes,
                }
            


        case ORDER:
            const orderType = action.payload.orderType
            const orderBy = action.payload.orderBy
            const sortedRecipes = orderType === 'asc' ?
                    state.recipes.sort((a, b) => {
                        if(a[orderBy] > b[orderBy]) {
                            return 1
                        }
                        if(a[orderBy] < b[orderBy]) {
                            return -1
                        }
                        return 0
                    }):
                    state.recipes.sort((a, b) => {
                        if(a[orderBy] < b[orderBy]) {
                            return 1
                        }
                        if(a[orderBy] > b[orderBy]) {
                            return -1
                        }
                        return 0
                    })
                    
                    return {
                        ...state,
                        recipes: sortedRecipes
                    }
                    
        case CLEAR:
            return {
                ...state,
                recipeDetails: {}
            }

        case DELETE_RECIPE:
            let filterRecipe= state.recipes.filter(recipe => recipe.id === action.payload)
            return {
                ...state,
                Myrecipes: filterRecipe
            }

        case ADD_TO_FAVORITES:
            const namerecipe = action.payload
            let favoriteRecipes = state.recipes.filter(recipe => recipe.name === namerecipe )
            return {
                ...state,
                favorites: [...state.favorites, ...favoriteRecipes],
            }

        case REMOVE_FROM_FAVORTES:
            let filteredfavorite = state.favorites.filter(recipe => recipe.name !== action.payload)
            return {
                ...state,
                favorites: filteredfavorite,
            }


        default:
            return state;
    }
}

