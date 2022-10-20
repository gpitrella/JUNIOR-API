import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, default:"No especificado"},
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}], 
    collaborations:[{type: Schema.Types.ObjectId, ref: 'Project'}],
    github:{type: String, default:"No especificado"},
    puntaje:{type: Number, default: 0},
    image:{
      type: String,
      default: "https://res.cloudinary.com/djgghmpgh/image/upload/v1663680302/CITYPNG.COM_HD_Profile_User_Round_Green_Icon_Symbol_Transparent_PNG_-_1074x1074_ih1sas.png"
    },
    token:{type: String, default:"token"},
    linkedin:{type: String, default:"No especificado"},
    status: {
      type: Boolean,
      default: true
    },
    techs: [{ type: String }], 
    tests: [{ 
      test: { type: String },
      value: { type: Number, default: 0 },
      date: { type: Date, default: Date.now }
  }],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

// UserSchema.methods.encryptPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };

// UserSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

export default mongoose.model("User", UserSchema);
