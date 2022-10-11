import Collaborator from "../models/Collaborator.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { ObjectId } from "mongodb";

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
    let { id } = req.body
    let getMyProjects = await User.findById(id)
    if (getMyProjects.projects.length){
        let projets = getMyProjects.projects.map(async m => await Project.findById(m))
        const resPromises = await Promise.all(projets)
        return res.json(resPromises)
      } else {
        return res.status(404).send("you don't have any project")
      }
}

export const userCollaborations = async (req,res)=>{
  let {idProject, idUserCollaborator, linkedin, number, text, email} = req.body 
  const message = "You must complete the required fields"
  // const regExpLiteral = /http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/gim
  // console.log(linkedin.match(regExpLiteral))
  try {
      if( idProject === idUserCollaborator ) { throw new Error( 'Eres el creador del proyecto, no puedes colaborar.')}
      if(!idProject || !idUserCollaborator || !linkedin || !number || !text || !email) { throw new Error( message ) }
      let project = await Project.findById(idProject)
      let findUsers = project.collaborators.filter((element) => element.idUser.toString() === idUserCollaborator)

      if(findUsers.length > 0) {
        throw new Error('You have already joined this project')
      } else {
        let pendingcolaborators = await Project.findByIdAndUpdate(idProject, { $push: { 'collaborators': { idUser: ObjectId(idUserCollaborator), status: 'pending' } } })
        await pendingcolaborators.save()
        return res.status(200).json({ message:'Collaboration sent successfully'})
      }
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

export const MyCollaborations = async (req,res)=>{
  let {id} = req.body
  let getMyColaborations = await User.findById(id)
  if (getMyColaborations.collaborations.length){
    let projets = getMyColaborations.collaborations.map(async m => await Project.findById(m))
    const resPromises = await Promise.all(projets)
    return res.json(resPromises)
  } else {
    return res.status(404).send("you don't have any collaboration")
  }
}
