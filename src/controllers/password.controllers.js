import jwt from "jsonwebtoken";
import User from "../models/User.js"
import { secret, expires, rounds } from '../auth.js';
import { hashSync, compareSync } from 'bcrypt';
import dotenv from "dotenv";
import { transporter } from "../helpers/mailer.js";
import { token } from 'morgan';
dotenv.config()

const CLIENT_URL = process.env.CLIENT_URL;
export const recoverPassword = async(req,res)=>{
    const { email } = req.body
    try {        
        if(!email){
            throw new Error('E-mail is required!')
        }
        let findUser = await User.findOne({ email })
        if(!findUser) throw new Error('User not found!');
        let token = jwt.sign({ usermail: findUser.email, id: findUser._id }, secret, {expiresIn: expires});
        findUser.token = token

        await findUser.save()
        res.send({ message: 'Check your email for a link to reset your password.'})
    } catch (error) {
        res.status(400).json(error.message)
    }
    try {
        // send mail with defined transport object
        await transporter.sendMail({
            from: '"recover password" <losmatabugs@gmail.com>', // sender address
            to: findUser.email, // list of receivers
            subject: "Recover Password", // Subject line
            text: "Hello. This email is for your email verification.",
            html:`
                <b>Please click on the following link:</b>
                <a href=${CLIENT_URL}/updatepassword/?token=${token}">Click para Recuperar Contraseña</a>
            `
        });
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const newPassword = async(req,res)=>{
    try {   
        const {newPassword} = req.body
        const token = req.headers
        if(!token && newPassword===0) res.status(400).json({message: 'All the fields are required'})
        let tokenverify= jwt.verify(token.token, secret)
        //let finduser= await User.findById(tokenverify.id)
        //if(compareSync(newPassword, finduser.password)) res.status(400).json({message:'ya has utilizado esta contraseña antes, prueba con otra...'})
        let hpassword = hashSync(newPassword, Number.parseInt(rounds))
        let user = await User.findByIdAndUpdate( tokenverify.id,{password:hpassword})
        await user.save()
        res.json('newpassword'+newPassword)
    } catch (error) {
        res.status(400).json(error.message)
    }
}