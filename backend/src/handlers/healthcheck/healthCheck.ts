import { Request, Response} from 'express'
import getAllArticles from '../articles/articlesGSI/getAllbyGSI';

export const healthcheck = (req:Request, res:Response)=>{
    return res.status(200).send('healthcheckgood');   
}