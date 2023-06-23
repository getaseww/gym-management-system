import express,{Application, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes';
const app:Application = express();
const port:number = 3000;

routes(app);

app.use(express.json())

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});