import {Router} from 'express';

const router = Router ();

router.use('/api/',require('./api'));


router.get('/*', (req,res)=>{
    res.status(404).send("Sorry, API not found");
})

module.exports = router;