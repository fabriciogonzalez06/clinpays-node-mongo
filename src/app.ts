import express,{Request,Response} from 'express';

import connect,{getDdUrl} from './helpers/db';
import indexRoutes from './routes/index';
import { demoApi } from './utils/demoApi';

const app:express.Application= express();

connect(getDdUrl());

app.use(express.json())
app.use(express.urlencoded());


app.get('/',(req:Request,res:Response)=>{
    res.status(200).send({res:demoApi()});
});
app.use('/api',indexRoutes);

const PORT= process.env.PORT_CLIMPAYS || 3000;

app.listen(PORT,()=>{
    console.log(`listen on port ${PORT}`);
});