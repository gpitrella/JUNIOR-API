import express from "express";
import session from "express-session";
import methodOverride from "method-override";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import { MONGODB_URI } from "./config.js";
import routes from './routes/index.routes.js';
import dotenv from "dotenv";

dotenv.config()
const { CLIENT_URL } = process.env;

// Initializations
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // Sirve para que formulario envie no solo get, put, sino delete o post. 
app.use( // Sirve para mantener una session del usuario.
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  })
);

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", CLIENT_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS, PUT, DELETE');
  next();
});

// Routes
app.use("/", routes);

app.use((req, res) => {
  res.render("404");
});

export default app;