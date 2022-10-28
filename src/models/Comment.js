import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String },
    answer: { type: String, default: '' },
    idProject: {type: Schema.Types.ObjectId, ref: 'Project'}, 
    idUser: {type: Schema.Types.ObjectId, ref: 'User'},
    view: { type: Boolean, default: false }
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.model("Comment", CommentSchema);