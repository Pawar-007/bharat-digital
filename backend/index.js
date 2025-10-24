import express from 'express';
import cors from "cors";
import router from './src/router/mgnregaRoutes.js';
import dotenv from 'dotenv';
import { connectDB } from './src/database/index.js';

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB().then(()=>{
   console.log('Database connected successfully');
})
.catch((err)=>{
   console.error('Database connection failed:', err);
})

app.use("/api/mgnrega", router);


app.get('/',(req,res)=>{
   res.send('Hello World!');
});



app.listen(3000,()=>{
   console.log('server is running on port 3000');
})