import jwt from "jsonwebtoken";
import User from "../models/User.js"
import { secret, expires, rounds } from '../auth.js';
import { hashSync, compareSync } from 'bcrypt';
import dotenv from "dotenv";
import { transporter } from "../helpers/mailer.js";

dotenv.config()

export const recoverPassword = async(req,res)=>{
    const {email} = req.body
    if(!email){
        throw new Error('email is required!')
    }
    const message = 'Check your email for a link to reset your password.';
    let token;
    let findUser;
    try {
        findUser = await User.findOne({email})
        if(!findUser) throw new Error(message);
        token = jwt.sign({ usermail: findUser.email, id: findUser._id }, secret, {expiresIn: expires});
        findUser.token=token
        await findUser.save()
        res.status(200).json({message:message})
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
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const newPassword = async(req,res)=>{
    try {   
        const {newPassword} = req.body
        const token = req.headers
        if(!token && newPassword===0) throw new Error('All the fields are required')
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