import bodyParser from 'body-parser';
import express from 'express'
import { PORT } from './config.js';
import routes from './routes/index.routes.js'

const app = express()

app.set('port',PORT)

// parse application/json
app.use(bodyParser.json())
 
app.use("/", routes);

export default app




