import Project from "../models/Project.js";
import Tech from "../models/Tech.js";
import User from "../models/User.js";
import Collaborator from "../models/Collaborator.js";
import { ObjectId } from "mongodb";


export const createNewProject = async (req, res) => {
  try {
    const { title, description, gitHubUrl, wspUrl, image, newtech, userId, payment, status, emailUser, tasks } = req.body;
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
    if (!newtech || newtech.length === 0) {
      errors.push({ text: "Please Write one tech" });
    }
    if (!tasks || tasks.length === 0) {
      errors.push({ text: "Please Write one tasks" });
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
          // const collaboratorsId = '632a3f676dafa46d00ce6cb1';
          const techs = newtech.map(f => f.toLowerCase()) 
          const allTasks = tasks.map((element) => { return { task: element, status: false} })

          const newProject = new Project({ title:title.toLowerCase(), description, gitHubUrl, wspUrl, image, tech: techs, userId, payment, status, emailUser, tasks: allTasks });  
          const saveProject = await newProject.save();

          // await Project.findByIdAndUpdate(saveProject._id.toString(), { $push: { 'collaborators': { idUser: ObjectId('632a4c68e031e22d1153fa90'), status: 'pending'} } })

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
};

export const getAllProyect = async (req, res) => {
  try {
    const findInDb = await Project.find({}).sort( { updatedAt: -1, "_id": 1 } )
    return res.status(200).json(findInDb)
  } catch (error) {
    return res.status(400).json(error.message)
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params
    const findProjectDb = await Project.findById(id)
    return res.status(200).json(findProjectDb)

  } catch (error) {
    return res.status(400).json(error.message)
  }
}

export const getProjectCollaborator = async (req, res) => {
  try{
      const {id} = req.params
      const findProjectDb = await Project.findById(id)
      const collaborator = findProjectDb.collaborators.map(async elem => await Collaborator.findById(elem))
      const respromise = await Promise.all(collaborator)
      res.status(200).json(respromise)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

export const updateProject = async (req, res) => {
  try {
    const { title, description, gitHubUrl, wspUrl, image, newtech, projectId, tasks, payment } = req.body;
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
    if (!newtech || newtech.length === 0) {
      errors.push({ text: "Please Write one tech" });
    }
    if (!tasks || tasks.length === 0) {
      errors.push({ text: "Please Write one task" });
    }
    if (errors.length > 0) {
      throw new Error(errors[0].text)
    }
    else {
      // const findInDb = await Project.findOne({ title })
      const findInDb = await Project.findById(projectId)
      console.log(findInDb)
      // if (!findInDb || findInDb._id==projectId) {
      if (findInDb) {
        const techs = newtech.map(f => f.toLowerCase());
        const allTasks = tasks.map((element) => { return { task: element, status: false} });

        const findInDbAndUpdate = await Project.findOneAndUpdate({ _id: projectId }, { title, description, gitHubUrl, payment, wspUrl, image, tech: techs, tasks: allTasks})
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
        throw new Error(`the project with title ${title.toUpperCase()} not exist`)
      }
    }
  } catch (error) {
    return res.status(400).json(error.message)
  }
};

export const projectDelete = async (req, res) => {
  try {
    const { id } = req.body
    await Project.findByIdAndDelete({ _id: id })
    return res.status(200).send('The project was successfully removed')
  } catch (error) {
    return res.status(400).json(error.message)
  }
}
