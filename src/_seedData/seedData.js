import Tech from "../models/Tech.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import mongoose from "mongoose";
import { MONGODB_URI } from "../config.js";
import {techsjson, projectsjson, usersjson} from './json.js'
console.log("usersjson",usersjson)
//create your array. i inserted only 1 object here

console.log(techsjson)
const techconverted = techsjson.map(e => new Tech(e))
const projectconverted = projectsjson.map(e => new Project(e))
const usersconverted = usersjson.map(e => new User(e))
console.log("usersconverted",usersconverted)

//connect mongoose
mongoose
  .connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser:true
	})
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });
//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically


let done = 0;

export const seedData = async () => {
  try {
    await Tech.deleteMany({});
    await User.deleteMany({});
    for (let i = 0; i < techconverted.length; i++) {
      techconverted[i].save(function (err, result) {
        done++;
      });
    }
    for (let j = 0; j < usersconverted.length; j++) {
      usersconverted[j].save(function (err, result) {
        done++;
        console.log(done)
      });
    }
    console.log("DONE!");
    // mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
  console.log("Mock data is seeded from seed script.");
};

seedData()
