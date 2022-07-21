import React from "react";


export default function Paginado ({ paginado, allRecipes, recipesPerPage}) {

    const pageNumber = []

    for (let i = 0; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumber.push(i)        
    }

    console.log(paginado);
    console.log(allRecipes);
    console.log(recipesPerPage)
    return (
        <nav>
            <ul>
                {
                pageNumber?.map(number => (
                    <li className="number" key={number}>
                        <button onClick ={ () => paginado(number)}> {number} </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
    
}