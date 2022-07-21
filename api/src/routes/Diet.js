const { Router } = require('express');
const { Diet } = require('../db')


const router = Router();

router.get('/', async (req, res, next) => {
    
    try {
        
        const diets = await Diet.findAll({
            raw: true,
        })

        console.log(diets);

        if(diets.length === 0 ) {
            let dietsdefault = [ 
                "Gluten Free",
                "Ketogenic",
                "Vegetarian",
                "Lacto-Vegetarian",
                "Ovo-Vegetarian",
                "Vegan",
                "Pescetarian",
                "Paleo",
                "Primal",
                "Low FODMAP",
                "Whole30"
            ]
    
            dietsdefault.forEach(diet => {
                Diet.create({
                    name : diet,
                })
            })
            res.send('Dietas agregadas correctamente');
        }
        else {
            return res.send(diets);
        }
    } catch (error) {
        next(error);
    }    
    
})
module.exports = router;
