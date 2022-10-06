import Tech from "../models/Tech.js";

export const createNewTech = async (req, res) => {
  const { name } = req.body;
  const errors = [];
  if (!name) {
    errors.push({ text: "Please Write a Tech's Name." });
  }
  if (errors.length > 0)
    return res.send(errors)
  const findInDb = await Tech.findOne({name:name})
  if(!findInDb){
    const newTech = await Tech.create({ name });
    return res.status(200).send(`Tech ${newTech.name} created successfully!`)
  }else{
    return res.status(200).send(`${name} already exist`)
  }
};

export const getAllTech = async (req,res)=>{
  try {
    const findInDb = await Tech.find({})
<<<<<<< HEAD
    res.status(200).json(findInDb)
=======
    console.log('entre a teches', findInDb)
    return res.status(200).json(findInDb)
>>>>>>> 405b384944abb629dd2e946e1cd1b44907b5b73b
  } catch (error) {
    return res.status(400).json(error.message)
  }
}


export const deleteTech = async(req,res)=>{
  try {
    let {id} = req.body
    await Tech.findByIdAndDelete({_id:id})
    res.status(200).send('The technology was successfully removed')
  } catch (error) {
    res.status(400).json(error.message)
  }
}