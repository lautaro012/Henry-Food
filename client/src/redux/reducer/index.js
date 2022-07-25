import { CREATE_RECIPE, FETCH_DETAILS, 
        FETCH_DIET, 
        FETCH_RECIPE, 
        FETCH_RECIPE_NAME, 
        FILTER_BY_DIET, 
        FILTER_CREATED, 
        ORDER
        } from "../actions";


const initialState = {
    recipes: [],
    Allrecipes: [],
    diets: [],
    recipeDetails: {}
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
                recipes: [...state.recipes, action.payload]
            }

        case FILTER_BY_DIET:

            // FILTRO POR DIETAS CON LOS VALUE
            const allrecipes = state.Allrecipes
            const specificDiet = action.payload
            const statusFiltered = specificDiet === 'all' ? allrecipes : allrecipes.filter(recipe => {
                if(recipe.diets.includes(specificDiet.toLowerCase()) || recipe.diets.includes(specificDiet)) {
                    return recipe
                }
                return console.log('Receta filtrada')
            }) 
            return {
                ...state,
                recipes: statusFiltered
            }

        case FILTER_CREATED:
            
            //FILTRA MIS RECETAS SOBRE EL FILTRO DE DIETA. NO SOBRE EL DE TODAS LAS RECETAS
            const myRecipes = state.recipes.filter(recipe => {
                if(typeof recipe.id === 'string') return recipe;
                return console.log('Receta filtrada')
            }) 
           

            return {
                ...state,
                recipes: myRecipes
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

        default:
            return state;
    }
}

// function Sort (a, b, prop, sort) {
//     switch (sort) {
//         case 'asc':
//             if(a[prop] > b[prop]) {
//                 return -1
//             }
//             if(b[prop] > a[prop]) {
//                 return 1
//             }
//             return 0  
//         case 'dec':
//             if(a[prop] > b[prop]) {
//                 return 1
//             }
//             if(b[prop] > a[prop]) {
//                 return -1
//             }
//             return 0  
//         default:
//             break;
//     }
// }