import app from './app.js';
import { connectDB } from './database.js';
import { PORT } from "./config.js";

app.listen(app.get('port'), async () => {
    await connectDB()
    console.log(`Example app listening on port ${PORT}`)
})