const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');
require('dotenv').config();
const {
    YOUR_API_KEY,
  } = process.env;



const router = Router();

router.get('/', async (req , res, next) => {
    try {

        const { name } = req.query;

        if(name) {
            // Lo Busco en la DB
            let searchInDB = await Recipe.findAll({
                where : {
                    name: {
                        [ Op.iLike ]:'%'+ name + '%',
                    }
                },
                nest: true,
                raw: true
                 
            })
            // Lo busco en la API
            let recipesFromApi= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=9`)
                .then(resp => resp.data)

            let filteredRecipesApi = [];

                recipesFromApi.results.map(recipe => {
                    if(recipe.title.toLowerCase().includes(name.toLowerCase())) {
                        filteredRecipesApi.push({
                            name: recipe.title ,
                            id: recipe.id,
                            resume: recipe.summary,
                            step_by_step: recipe.analyzedInstructions,
                            health_score: recipe.healthScore,
                            image: recipe.image,
                            extendedIngredients: recipe.analyzedInstructions.length ? recipe.analyzedInstructions[0].steps : "There are no instructions.",
                            dishTypes: recipe.dishTypes,
                            diets: recipe.diets,
                        })
                    } 
                })

            let recipes = [...searchInDB, ...filteredRecipesApi]    

            if(recipes.length > 0) {
                recipes.sort(function (a, b) {
                    if(a.name > b.name) {
                        return 1
                    }
                    if(b.name > a.name) {
                        return -1
                    }
                    return 0
                });
                res.send(recipes)
            } else {
                res.status(404).send('No se encontro receta con ese nombre.')
            }

        } else {  //Si el name no existe busco todas las recetas

            // traigo las recetas desde la Api y desde mi DB
            let recipesFromApi= axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
                    .then(resp => resp.data);
            
            let recipesFromDB= await Recipe.findAll({
                include: 
                    { 
                        model: Diet, 
                        as: 'diets', 
                        attributes: ['id', 'name'], 
                        through: { attributes: [] }
                    }
                ,
                nest: true,
                // raw: true (problemas anidando los diets)
            });
            
            
            Promise.all([
                recipesFromApi, 
                recipesFromDB
            ])
            .then((response) => {

                const [recipesApi, recipesDb] = response;
                
                // Extraigo lo mas importante de la API
                let filteredRecipesApi = recipesApi.results.map(recipe => {
                    return {
                    name: recipe.title ,
                    id: recipe.id,
                    resume: recipe.summary,
                    step_by_step: recipe.analyzedInstructions.length ? recipe.analyzedInstructions[0].steps : "There are no instructions.",
                    health_score: recipe.healthScore,
                    image: recipe.image,
                    cheap: recipe.cheap,
                    veryPopular: recipe.veryPopular,
                    dishTypes: recipe.dishTypes,  
                    diets: recipe.diets,
                    }
                })

                let orderedRecipesDb = recipesDb.map(recipe => {
                    return {
                    name: recipe.dataValues.name,
                    id: recipe.dataValues.id,
                    resume: recipe.dataValues.resume,
                    health_score: recipe.dataValues.health_score,
                    image: recipe.dataValues.image,
                    cheap: recipe.dataValues.cheap,
                    veryPopular: recipe.dataValues.veryPopular,
                    dishTypes: recipe.dataValues.dishTypes,  
                    step_by_step: recipe.dataValues.step_by_step,
                    diets: recipesDb[0].diets.map(diet => {
                        return diet.dataValues.name
                    }) 
                    }
                })

                

                const recipes = [...filteredRecipesApi, ...orderedRecipesDb]
                
                recipes.sort(function (a, b) {
                    if(a.name > b.name) {
                        return 1
                    }
                    if(b.name > a.name) {
                        return -1
                    }
                    return 0
                });
              
                res.send(recipes);


            }) 
        
        
        
        
        }
        
        

                                
    } catch (error) {
        next(error);
    }
    
})

router.get('/:idReceta', async (req, res, next) => {

    try {
        const { idReceta } = req.params;
        // si es un string, la receta es creada por el usuario
            if( typeof idReceta == 'string' && idReceta.length > 6 ) {

                let recipe = await Recipe.findByPk(idReceta)
                let diets = await recipe.getDiets()
                diets = diets.map(diet => {
                    return diet.dataValues.name
                    
                })
                return res.send({...recipe.dataValues, diets})

            } else {
                
                    let recipesFromApi= await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${YOUR_API_KEY}`)


                    let filteredRecipesApi = {
                            name: recipesFromApi.data.title ,
                            id: recipesFromApi.data.id,
                            resume: recipesFromApi.data.summary,
                            step_by_step: recipesFromApi.data.analyzedInstructions.length ? recipesFromApi.data.analyzedInstructions[0].steps : "There are no instructions.",
                            health_score: recipesFromApi.data.healthScore,
                            image: recipesFromApi.data.image,
                            extendedIngredients: recipesFromApi.data.extendedIngredients.map(ingredient => ingredient.original),
                            dishTypes: recipesFromApi.data.dishTypes,
                            diets: recipesFromApi.data.diets
                        }
                        res.send(filteredRecipesApi)
            }
                
            
        }

     catch (error) {
        next(error);
    }

})


router.post('/', async (req, res, next) => {
    try {
        const { name, resume, health_score, step_by_step, veryPopular, image, cheap, dishTypes, extendedIngredients  } = req.body
        const newRecipe = await Recipe.create({
            name,
            resume,
            health_score,
            step_by_step,
            extendedIngredients,
            image,
            cheap,
            dishTypes,
            veryPopular      
        })
        res.send(newRecipe);
    } catch (error) {
        next(error);
    }

})


router.post('/:idRecipe/diet/:idDiet', async (req, res, next) => {

    try {
        const { idRecipe, idDiet } = req.params;

        
        const recipe = await Recipe.findByPk(idRecipe);

        // console.log(recipe.dataValues);
        await recipe.addDiet(idDiet)
        res.send('okey')

        

    } catch (error) {
        next(error)
    }
    
})


router.delete('/',(req, res) => {
    
})

module.exports = router;
