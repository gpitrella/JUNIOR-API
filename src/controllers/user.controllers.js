import Collaborator from "../models/Collaborator.js"
import Project from "../models/Project.js"
import User from "../models/User.js"

export const AllUsers = async (req,res)=>{
  try {
    const findInDb = await User.find({})
    res.status(200).json(findInDb)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

export const userProjects = async (req, res)=>{
    let {id} = req.body
    let getMyProjects = await User.findById(id)
    console.log(getMyProjects.projects.length)
    if (getMyProjects.projects.length){
        let projets = getMyProjects.projects.map(async m => await Project.findById(m))
        const resPromises = await Promise.all(projets)
        console.log("projects",resPromises )
        res.json(resPromises)
      } else {
        res.status(404).send("you don't have any project")
      }
}

export const userCollaborations = async (req,res)=>{
  let {idProject, idUser, linkedin, number, text, email} = req.body 
  const message = "you must complete the required fields"
  if(!idProject && !idUser && !linkedin && !number && !text && !email) res.status(400).json({message})

  let project = await Project.findById(idProject)
  let user = await User.findById(idUser)
  if(project && user){
    let newCollaborator = await Collaborator.create({idUser, linkedin, number, text, email})
    await user.update({ $push: { 'project': idProject } })
    await project.update({ $push: { 'colaborators': newCollaborator._id } })
  }



}
