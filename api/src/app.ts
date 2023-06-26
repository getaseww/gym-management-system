import express,{Application, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes';
const app:Application = express();
const port:number = 3000;
app.use(express.json())


app.post('/example', (req:Request, res:Response) => {
  console.log(req.body);
  res.send('Request body logged.');
});
routes(app);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});