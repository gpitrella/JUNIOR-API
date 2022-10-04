import User from "../models/User.js";
import { compareSync, hashSync } from 'bcrypt';
import { secret, expires, rounds } from '../auth.js';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();

export const signin = async (req, res) => {
  try {
      const { email, password } = req.body;
      const userFound = await User.findOne({ email: email });
      if (!userFound) {
         throw new Error("Wrong Email or Password");
      } else {
          if (compareSync(password, userFound.password)) {  
            // Creamos el token
            let token = jwt.sign({ user: userFound }, secret, {expiresIn: expires});
            res.json({
                user: userFound,
                token: token,
                msg: 'User login successfully.' 
            })
          } else {
            // Unauthorized Access
            throw new Error("Wrong Email or Password");
        }        
      }
  } catch (err) { 
      res.status(404).json(err.message);
  }
}

export const signup = async (req, res) => {
  try {
      const { name, email, password, confirm_password, image } = req.body; 
      if (password !== confirm_password) {
        throw new Error("Passwords do not match.")
      }
      if (password.length < 4) {
        throw new Error("Incorrect length password")
      }

      // Look for email coincidence
      const userFound = await User.findOne({ email: email });
      if (userFound) {
        throw new Error("Email already used")
        // res.status(404).json({ msg: "Email already used" });
      } else {
        // Saving a New User
        let hpassword = hashSync(password, Number.parseInt(rounds))
        const newUser = new User({ name, email, password: hpassword, image });
        console.log(newUser)
        await newUser.save();
        // newUser.password = await newUser.encryptPassword(password);
        let token = jwt.sign({ user: newUser }, secret, {expiresIn: expires});

        res.json({
          user: newUser,
          token: token,
          msg: 'User create successfully.' 
        });
      }
        
    } catch (err) { 
        res.status(404).json(err.message);
    }
};


export const logout = async (req, res) => {
  if (req.logout) req.logout();
    res.status(201).json({
      success: true
  })
};