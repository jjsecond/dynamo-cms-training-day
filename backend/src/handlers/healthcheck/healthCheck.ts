import { Request, Response} from 'express'
import getAllArticles from '../articles/getAllArticles';

export const healthcheck =(req:Request, res:Response)=>{
    getAllArticles();
    res.status(200);
    return res.send('healthcheckgood');   
}