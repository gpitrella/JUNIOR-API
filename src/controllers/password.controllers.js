import jwt from "jsonwebtoken";
import User from "../models/User.js"
import { secret, expires, rounds } from '../auth.js';
import { hashSync, compareSync } from 'bcrypt';
import dotenv from "dotenv";
dotenv.config()

export const recoverPassword = async(req,res)=>{
    const {email} = req.body
    if(!email){
        res.status(400).json({message: 'mail is required!'})
    }
    try {
        const message = 'Check your email for a link to reset your password.';
        // let verificationLink;
        // let emailStatus = 'ok';
    
        let findUser = await User.findOne({email})
        if(!findUser) res.status(400).json(message);
        let token = jwt.sign({ usermail: findUser.email }, secret, {expiresIn: expires});
        findUser.token=token
        await findUser.save()
        res.json(message)
    } catch (error) {
        res.status(400).json(message)
    }
}
export const newPassword = async(req,res)=>{
    const {newPassword} = req.body
    const token = req.user
    console.log(token)
    if(!token && newPassword===0){
        res.status(400).json({message: 'All the fields are required'})
    }
    res.json(token)

}