const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = async(req, res) =>{
    const {username, email, password} = req.body;

    //Check if is a valid user
    if(!username){
        return res.status(422).json({msg: 'O nome de usuário é obrigatório!'});
    }
    if(!email){
        return res.status(422).json({msg: 'O e-mail é obrigatório!'});
    }
    if(!password){
        return res.status(422).json({msg: 'A senha é obrigatória!'});
    }

    //check if user already exists
    const emailExists = await User.findOne({email : email});
    if (emailExists){
        return res.status(422).json({msg: 'O email já está cadastrado!'});
    }

    const userExists = await User.findOne({username: username});
    if (userExists){
        return res.status(422).json({msg: 'O nome de usuário já está cadastrado!'});
    }

    //generate password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create user
    const user = new User({
        email,
        username,
        password: passwordHash,
    })


    //save in database
    try{
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id,
        }, secret);

        await user.save();
        
        res.status(201).json({user, token});
    }catch(e){
        console.log(e);
        res.status(500).json({msg: `${e}`});
    }
}