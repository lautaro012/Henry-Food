const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const { Op } = require('sequelize');
const axios = require('axios')

// const YOUR_API_KEY = '6f8483e9e0d147498227b6f04df7a4b8'

const YOUR_API_KEY = '3e53167df35647c19dfd101a5233dbc5'

// const YOUR_API_KEY = 'be5300dbbf044534a95cd8b9e861ed56'

// const YOUR_API_KEY = '35a39f22390440e9a4557b2ef96f28cf'

// const YOUR_API_KEY = '6578d9b882e7494b9ace55114866764c'

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
            let recipesFromApi= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
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
                include: [
                    { 
                        model: Diet, 
                        as: 'diets', 
                        attributes: ['id', 'name'], 
                        through: { attributes: [] }
                    }
                ],
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
                    step_by_step: recipe.analyzedInstructions,
                    health_score: recipe.healthScore,
                    image: recipe.image,
                    diets: recipe.diets,
                    }
                })

                let orderedRecipesDb = recipesDb.map(recipe => {
                    return {
                    name: recipe.dataValues.name,
                    id: recipe.dataValues.id,
                    resume: recipe.dataValues.resume,
                    health_score: recipe.dataValues.healthScore,
                    step_by_step: recipe.dataValues.step_by_step,
                    diets: recipesDb[0].diets.map(diet => {
                        return diet.dataValues.name
                    }) 
                    }
                })

                console.log(orderedRecipesDb)

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
                
                return res.send(recipe)

            } else {
                
                    let recipesFromApi= await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${YOUR_API_KEY}`)


                    let filteredRecipesApi = {
                            name: recipesFromApi.data.title ,
                            id: recipesFromApi.data.id,
                            resume: recipesFromApi.data.summary,
                            step_by_step: recipesFromApi.data.analyzedInstructions,
                            health_score: recipesFromApi.data.healthScore,
                            image: recipesFromApi.data.image,
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
        const { name, resume, health_score, step_by_step  } = req.body
        const newRecipe = await Recipe.create({
            name,
            resume,
            health_score,
            step_by_step,
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
