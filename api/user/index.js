import {Router} from 'express';
import Promise from 'bluebird';
import passport from 'passport';
import {saltHashPassword} from '../../helper/crypto';
import User from '../../models/Users';
import config from 'nconf';
import JwtHelper from '../../helper/JwtHelper';
const router = Router();


const signOptions = {
    issuer:config.get("ISSUER"),
    subject:config.get("SUBJECT"),
    audience:config.get("AUDIENCE"),
    expiresIn: '1h',
}




router.post("/authenticate", passport.authenticate('local'),(req,res,next)=>{
    // JWT token;
    var userObj = req.user;
    //console.log(userObj);

    const token = JwtHelper.sign(userObj,signOptions)
    res.json({
        user:req.user,
        token:token
    })


})

router.post("/register", (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    var hashed_password = saltHashPassword(password);
    const newPassword = hashed_password.password;
    const salt = hashed_password.salt;
    var newUser = new User({
        username:username,
        email:email,
        date_created: Date.now(),
        first_name:first_name,
        last_name:last_name,
        hashed_password:newPassword,
        isActive:true,
        salt:salt,
        roles:"user"
    })
    newUser.save((err,result)=>{
        if(err){
            res.status(409).send({name:err.name,message:err.message});
        }
        res.status(200).send(result);
    })
})

router.post("/disable", (req,res,next)=>{
    const filter = { username: req.body.username };
    const update = { isActive: false };
    User.findOneAndUpdate(filter, update,(err,result)=>{
        if(err){
            res.status(409).send({name:err.name,message:err.message});
        }
        res.status(200).send(result);
    });
})

router.post("/deregister", (req,res,next)=>{
    const filter = { username: req.body.username };
    User.findOneAndDelete(filter, (err,result)=>{
        if(err){
            res.status(409).send({name:err.name,message:err.message});
        }
        res.status(200).send(result);
    });
})

router.get("/finduser", (req,res,next)=>{
    const filter = { username: req.body.username };
    /*User.find(filter,(err, items)=> {
        for (i in items){


       }
        res.status(200).send(items);
    });*/
    
    User.findOne(filter, (err,result)=>{
        if(err){
            res.status(409).send({name:err.name,message:err.message});
        }
        res.status(200).send(result);
    });
})


module.exports = router;
