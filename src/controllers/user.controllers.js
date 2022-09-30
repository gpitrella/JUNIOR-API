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
export const prueba = async(req,res)=>{
  const {id} = req.body
  let mynewproperty = await User.findById(id)
  mynewproperty.token='nueva prop'
  await mynewproperty.save()
  res.json(mynewproperty)
}
