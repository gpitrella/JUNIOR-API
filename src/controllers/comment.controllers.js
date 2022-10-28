import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Project from "../models/Project.js";

export const getCommentsByUser = async (req,res)=>{
    try {
        let { idUser } = req.params
        let user = await User.findById(idUser)
        if(!user) throw new Error('user not found')
        if (user.comments.length > 0) {
          let comments = user.comments.map(async (comment) => await Comment.findById(comment))
            const resPromises = await Promise.all(comments)
            res.json(resPromises)
          } else {
            res.send([])
          }
      } catch (error) {
        res.status(400).json(error.message)
      }
};

export const getCommentsByProject = async (req,res)=>{
    try {
        let { idProject } = req.params
        let project = await Project.findById(idProject)
        if(!project) throw new Error('Project not found')
        if(project.comments.length > 0) {
          let comments = project.comments.map(async (comment) => await Comment.findById(comment))
            const resPromises = await Promise.all(comments)
            res.json(resPromises)
          } else {
            res.send([])
          }
      } catch (error) {
        res.status(400).json(error.message)
      }
};

export const postComment = async (req,res)=>{
  try {
      const { comment, idProject, idUser } = req.body
      const errors = [];
      if (!comment) {
        errors.push({ text: "Please write a comment." });
      }
      if (!idProject) {
        errors.push({ text: "Please send a idProject" });
      }
      if (!idUser) {
        errors.push({ text: "Please send a idUser" });
      }
      if (errors.length > 0) {
        throw new Error(errors[0].text)
      } else {
        const findProjectDb = await Project.findById(idProject)
        const findUserDb = await User.findById(idUser)
        if(!findProjectDb) throw new Error('Project not found')
        if(!findUserDb) throw new Error('User not found')
        if(findProjectDb && findUserDb) {
          const newComment = new Comment({ comment: comment, idProject: idProject, idUser: idUser });  
          const saveComment = await newComment.save();
          await User.findByIdAndUpdate(idUser, { $push: { 'comments': saveComment._id } })
          await Project.findByIdAndUpdate(idProject, { $push: { 'comments': saveComment._id } })
          res.status(200).json(saveComment)
        }
      }
    } catch (error) {
      res.status(400).json(error.message)
    }
};


export const answerComment = async (req,res)=>{
  try {
      let { idComment } = req.params;
      const { idProject, idUser, answer, view } = req.body;
      // idUser is ID of the user who CREATED the PROJECT.
      const errors = [];
      if (!idComment) {
        errors.push({ text: "Please send a idComment." });
      }
      if (!idProject) {
        errors.push({ text: "Please send a idProject" });
      }
      if (!answer) {
        errors.push({ text: "Please send an answer" });
      }
      if (errors.length > 0) {
        throw new Error(errors[0].text)
      } else {
        let comment = await Comment.findById(idComment)
        if( !comment ) throw new Error('Comment not found')
        let project = await Project.findById(idProject)
        if( !project ) throw new Error('Project not found')
        if( project.userId !== idUser ) throw new Error('Only the project Creator can answer questions')
        if( project.userId === idUser && comment ) {
          const findInDbAndUpdate = await Comment.findOneAndUpdate({ _id: idComment }, { answer, view })
          const saveComment = await findInDbAndUpdate.save();
          res.status(200).json(`Comment update successfully`) 
        }
      }
    } catch (error) {
      res.status(400).json(error.message)
    }
};

