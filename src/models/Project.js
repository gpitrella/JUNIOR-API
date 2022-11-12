import mongoose from "mongoose";
const { Schema } = mongoose;
// const Tech = mongoose.model("Tech", TechSchema)
const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    gitHubUrl: {
        type: String,
        required: true,
    },
    wspUrl:{
      type: String,
      require: false,
    },
    tech: {
      type:[{type: String, required: true}],
    },
    payment: { 
      type: Boolean, 
      required: true, 
      default: false
    },
    userId: {
      type: String,
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/djgghmpgh/image/upload/v1663185370/newproject_xeorkj.webp",
    },
    status: {
      type: String,
      enum: ['develop','finish'],
      default: 'develop'
    },
    collaborators: [{ 
        idUser: { type: Schema.Types.ObjectId, ref: 'User' },
        status: { type: String,
            enum: ['pending','collaborator', 'cancelled'],
            default: 'pending'
        }
    }],
    tasks: [{
        task: { type: String, required: true, default: '' },
        status: { type: Boolean,  default: false }
    }],
    emailUser:{
      type:String,
      required: true
    },
    images: [{ type: String, default: '' }],
    paymentAmount: { type: Number, default: 0 },
    collaboratorsNumber: { type: Number, default: 0 },
    comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}],
    deployment: {
      type: String, default: ''
    },
    sendInvitation: [{ 
      idUser: { type: Schema.Types.ObjectId, ref: 'User' },
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", ProjectSchema);