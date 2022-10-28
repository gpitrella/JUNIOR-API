// import Collaborator from "../models/Collaborator.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import Tech from "../models/Tech.js";
import { ObjectId } from "mongodb";
import { transporter } from "../helpers/mailer.js";
import { emailCollaborate } from "../helpers/constant.js";
import { secret, expires, rounds } from '../auth.js';
import jwt from 'jsonwebtoken';

export const AllUsers = async (req,res)=>{
  try {
    const findInDb = await User.find({})
    return res.status(200).json(findInDb)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const findUserDb = await User.findById(id)
    res.status(200).json(findUserDb)
  } catch (err) {
    res.status(400).json(err.message)
  }
}

export const userProjects = async (req, res)=>{
  try {
    let { id } = req.params
    let getMyProjects = await User.findById(id)
    if (getMyProjects.projects.length > 0) {
      let projets = getMyProjects.projects.map(async (m) => await Project.findById(m))
        const resPromises = await Promise.all(projets)
        res.json(resPromises)
      } else {
        res.send([])
      }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

// GET USER COLLABORATOR Name
export const userCollaboratorName = async (req, res)=>{
  try {
    let { id } = req.params
    let getUserCollaborator = await User.findById(id)
        res.status(200).json(getUserCollaborator.name)
    } catch (error) {
    res.status(400).json(error.message)
  }
}

// Controlador para hacer agregar un colaborador a un Proyecto:
export const userCollaborations = async (req,res)=>{
  let {idProject, idUserCollaborator, linkedin, number, text, email, github } = req.body 
  const message = "You must complete the required fields"
  // const regExpLiteral = /http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/gim
  // console.log(linkedin.match(regExpLiteral))
  
  try {
      if( idProject === idUserCollaborator ) { throw new Error( 'Eres el creador del proyecto, no puedes colaborar.')}
      if(!idProject || !idUserCollaborator || !linkedin || !number || !text || !email || !github) { throw new Error( message ) }
      let project = await Project.findById(idProject)
      let userProject = await User.findById(project.userId)
      let userColaborator = await User.findById(idUserCollaborator)
  
      let findUsers = project.collaborators.filter((element) => element.idUser.toString() === idUserCollaborator)

      if(findUsers.length > 0) {
        throw new Error('Ya estas colaborando en este Proyecto.')
      } else {
        let pendingcolaborators = await Project.findByIdAndUpdate(idProject, { $push: { 'collaborators': { idUser: ObjectId(idUserCollaborator), status: 'pending' } } })
        let pendingUserColaborators = await User.findByIdAndUpdate(idUserCollaborator, { $push: { 'collaborations': project._id } })

        await pendingcolaborators.save()
        await pendingUserColaborators.save()

        // ENVIO DE MAIL AL CREADOR DEL PROYECTO
        const answerEmail = emailCollaborate(text, email, linkedin, number, userProject, userColaborator, github)
        await transporter.sendMail({
          from: '"Tienes un nuevo colaborador disponible." <losmatabugs@gmail.com>', // sender address
          to: project.emailUser, // list of receivers
          subject: `Hola ${userProject.name} tienen un nuevo colaborador.`, // Subject line
          text: `Hola ${userProject.name} tienes un nuevo colaborador disponible te enviamos adjuntos todo los datos para que puedas contactarlo.`,
          html: `${ answerEmail }`
      });
        return res.status(200).json({ message:'Collaboration sent successfully'})
      }
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

export const MyCollaborations = async (req,res)=>{
  let { id } = req.body
  try {
    let getMyColaborations = await User.findById(id)
    if (getMyColaborations.collaborations.length > 0){
      let projets = getMyColaborations.collaborations.map(async m => await Project.findById(m))
      const resPromises = await Promise.all(projets)
      res.json(resPromises)
    } else {
      res.json([])
    }
  } catch (error)  {
    return res.status(400).json(error.message)
  }
}

export const userUpdate = async (req, res) => {
  try{
      let { id } = req.params;
      let data = req.body

      let findUserInDb = await User.findById(id)
      if (findUserInDb) {
        if(!findUserInDb.status){
          throw new Error(`Usuario bloqueado.`)
        }else{
          const findInDbAndUpdate = await User.findOneAndUpdate({ _id: id }, data)
          await findInDbAndUpdate.save();
          const saveUser = await User.findById(id)
          if(saveUser.techs.length > 0){
            saveUser.techs.forEach(async (m) => {
              if (!await Tech.findOne({ name: m })) {
                await Tech.create({ name: m })
              } 
            })    
          }
          let token = jwt.sign({ user: saveUser }, secret, {expiresIn: expires});

          res.json({
            user: saveUser,
            token: token,
            msg: 'Usuario Actualizado Correctamente.' 
          });
        }
     } else {
        throw new Error(`Usuario no encontrado.`)
     }
  }catch(error){
    return res.status(400).json(error.message)
  }
}
