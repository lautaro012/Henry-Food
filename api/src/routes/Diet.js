const { Router } = require('express');
const { Diet } = require('../db')


const router = Router();

router.get('/', async (req, res, next) => {
    
    try {
        
        const diets = await Diet.findAll({
            raw: true,
        })

        if(diets.length === 0 ) {
            let dietsdefault = [ 
                                "gluten free",
                                "dairy free",          
                                "ketogenic",           
                                "lacto ovo vegetarian",
                                "vegan",               
                                "pescatarian",         
                                "paleolithic",         
                                "primal",              
                                "fodmap friendly",     
                                "whole 30"
            ]
    

            let promises = []
            dietsdefault.forEach(diet => {
                promises.push(Diet.create({
                    name : diet,
                }))
            })

            Promise.all(promises)
            .then((value) => {
                Diet.findAll()
                .then(diets => {
                    return res.send(value)
                })
            })

        }
        else {
            return res.send(diets);
        }
    } catch (error) {
        next(error);
    }    
    
})
module.exports = router;
