import express,{Application, Request, Response } from 'express';
// import dotenv from 'dotenv';

const app:Application = express();
const port:number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});