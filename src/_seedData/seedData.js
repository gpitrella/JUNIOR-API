import Tech from "../models/Tech.js";
import mongoose from "mongoose";
import { MONGODB_URI } from "../config.js";
import {techsjson} from './json.js'

//create your array. i inserted only 1 object here

console.log(techsjson)
const techconverted = techsjson.map(e => new Tech(e))

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
techconverted.map(async (t, index) => {
  await t.save((err, result) => {
    if (index === techconverted.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});

