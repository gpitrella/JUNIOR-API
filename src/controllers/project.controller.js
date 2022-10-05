import Project from "../models/Project.js";
import Tech from "../models/Tech.js";
import User from "../models/User.js";
import Collaborator from "../models/Collaborator.js";
import {ObjectId} from "mongodb"


export const createNewProject = async (req, res) => {
  try {
    const { title, description, gitHubUrl, wspUrl, image, newtech, userId, payment, status, emailUser } = req.body;
    const errors = [];
    if (!title) {
      errors.push({ text: "Please Write a Title." });
    }
    if (!description) {
      errors.push({ text: "Please Write a Description" });
    }
    if (!gitHubUrl) {
      errors.push({ text: "Please Write one gitHubUrl" });
    }
    if (!newtech) {
      errors.push({ text: "Please Write one tech" });
    }
    if (errors.length > 0) {
      throw new Error(errors[0].text)
    }
    else {
      const findInDb = await Project.findOne({ title: title.toLowerCase() })
      await User.findOne({"_id": ObjectId(userId)}).then(async result=>{ 
        if ( result === null) {
          throw new Error("User not founded")
        }else if(!findInDb){
          const techs = newtech.map(f => f.toLowerCase()) 
          const newProject = new Project({ title:title.toLowerCase(), description, gitHubUrl, wspUrl, image, tech: techs, userId, payment, status, emailUser });  
          const saveProject = await newProject.save();
          const mapName = saveProject.tech.map(m => m)
          mapName.forEach(async m => {
            if (!await Tech.findOne({ name: m })) {
              await Tech.create({ name: m })
            }
          })
          await User.findByIdAndUpdate(userId, { $push: { 'projects': saveProject._id } })
          return res.status(200).json(saveProject)
        } else {
          throw new Error(`the project with title ${title.toUpperCase()} already exist`)
        }
     }).catch(err=>{
         return res.status(500).send(err.message);         
     })
      
    }
  } catch (error) {
    return res.status(400).json(error.message)
  }
}
export const getAllProyect = async (req, res) => {
  try {
    const findInDb = await Project.find({}).sort( { createdAt: 1, "_id": 1 } )
    return res.status(200).json(findInDb)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

export const getProjectById = async (req, res) => {
  try {
    const {id} = req.params  || req.body
    const findProjects = await Project.findById(id)
    return res.status(200).json(findProjects)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

export const getCollaborator_project = async (req, res) =>{
  const {id} = req.params || req.body
  try {
    const findProject = await Project.findById(id)
    const collaborators = findProject.collaborators.map(async m => await Collaborator.findById(m))
    const resCollaborators = await Promise.all(collaborators)
    if(resCollaborators.length){
      return res.status(200).json(resCollaborators)
    } else{
      throw new Error("Doesn't have collaborators")
    }
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

export const updateProject = async (req, res) => {
  try {
    const { title, description, gitHubUrl, wspUrl, image, newtech, projectId } = req.body;
    const errors = [];
    if (!title) {
      errors.push({ text: "Please Write a Title." });
    }
    if (!description) {
      errors.push({ text: "Please Write a Description" });
    }
    if (!gitHubUrl) {
      errors.push({ text: "Please Write one gitHubUrl" });
    }
    if (!newtech) {
      errors.push({ text: "Please Write one tech" });
    }
    if (errors.length > 0) {
      throw new Error(errors[0].text)
    }
    else {
      const findInDb = await Project.findOne({ title })
      console.log(findInDb)
      if (!findInDb || findInDb._id==projectId) {
        const techs = newtech.map(f => f.toLowerCase())
        const findInDbAndUpdate = await Project.findOneAndUpdate({ _id: projectId }, { title, description, gitHubUrl, wspUrl, image, tech: techs, })
        const saveProject = await findInDbAndUpdate.save();
        const mapName = saveProject.tech.map(m => m)
        mapName.forEach(async m => {
          if (!await Tech.findOne({ name: m })) {
            await Tech.create({ name: m })
          }
        })
        return res.status(200).json(`${saveProject.title} update successfully`)
      }
      else {
        throw new Error(`the project with title ${title.toUpperCase()} already exist`)
      }
    }
  } catch (error) {
    return res.status(400).json(error.message)
  }
}
export const projectDelete = async (req, res) => {
  try {
    const { id } = req.body
    await Project.findByIdAndDelete({ _id: id })
    return res.status(200).send('The project was successfully removed')
  } catch (error) {
    return res.status(400).json(error.message)
  }
}
