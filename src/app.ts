import express,{Request,Response} from 'express';

import connect,{getDdUrl} from './helpers/db';
import indexRoutes from './routes/index';
import { demoApi } from './utils/demoApi';

const app:express.Application= express();

connect(getDdUrl());

app.use(express.json())
app.use(express.urlencoded());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



app.get('/',(req:Request,res:Response)=>{
    res.status(200).send({res:demoApi()});
});
app.use('/api',indexRoutes);

const PORT= process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`listen on port ${PORT}`);
});