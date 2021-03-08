import {Router} from 'express';

const IndexRoutes:Router= Router();


//phoneBook
import phoneBookRoutes from './phoneBookRoutes';


IndexRoutes.use('/v1/phoneBook',phoneBookRoutes);



export default IndexRoutes;