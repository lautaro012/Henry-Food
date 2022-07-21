import { FETCH_DIET, FETCH_RECIPE } from "../actions";


const initialState = {
    recipes: [],
    filteredrecipes: [],
    diets: []
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_RECIPE:
            return {
                ...state,
                recipes: action.payload
            }
    
        case FETCH_DIET:
            return {
                ...state,
                diets: action.payload
            }

        default:
            return state;
    }
}