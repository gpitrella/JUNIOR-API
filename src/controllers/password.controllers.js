import jwt from "jsonwebtoken";
import User from "../models/User.js"
import { secret, expires, rounds } from '../auth.js';
import { hashSync, compareSync } from 'bcrypt';
import dotenv from "dotenv";
import { transporter } from "../helpers/mailer.js";

dotenv.config()

const CLIENT_URL = process.env.CLIENT_URL;
export const recoverPassword = async(req,res)=>{
    const { email } = req.body
    const message = 'Check your email for a link to reset your password.';
    let token;
    let findUser;
    try {
        if(!email){
            throw new Error('email is required!')
        }
        findUser = await User.findOne({email})
        if(!findUser) throw new Error('User not found');
        token = jwt.sign({ usermail: findUser.email, id: findUser._id }, secret, {expiresIn: expires});
        findUser.token=token
        await findUser.save()
        try {
            // send mail with defined transport object
            await transporter.sendMail({
                from: '"recover password" <losmatabugs@gmail.com>', // sender address
                to: findUser.email, // list of receivers
                subject: "Recover Password", // Subject line
                text: "Hello. This email is for your email verification.",
                html:`
                <b>Please click on the following link:</b>
                <a href=${CLIENT_URL}/newpassword/?token=${token}">Click para Recuperar Contraseña</a>
                `
            });
            res.status(200).json({message:message})
        } catch (error) {
            res.status(400).json(error.message)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const newPassword = async(req,res)=>{
    try {   
        const newPassword = req.query.newPassword
        const totaldata = req.body.headers.Authorization
        const token = totaldata.slice(totaldata.indexOf(' ') + 1, totaldata.length - 1)
        if(!token && !newPassword) throw new Error('All the fields are required')
        jwt.verify(token, secret, async (error, decoded) => {
            if(error){
                throw new Error('There was a problem decoding the token:', error)
            }else{
                let hpassword = hashSync(newPassword, Number.parseInt(rounds))
                let user = await User.findByIdAndUpdate( decoded.id, {password:hpassword})
                await user.save()
                res.json('Password updated successfully')
            }
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
};