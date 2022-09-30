import mongoose from "mongoose";
const { Schema } = mongoose;
const CollaboratorSchema = new mongoose.Schema(
  {
    idUser: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    linkedin: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
        maxLength: 500,
    },
    email:{
        type: String,
        require:true,
    },
    status:{
      type: String,
      enum: ['pending','accepted','reject'],
      default: 'pending'
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Collaborator", CollaboratorSchema);
