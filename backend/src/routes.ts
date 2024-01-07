import express from "express";
import { healthcheck } from "./handlers/healthcheck/healthCheck";
import getAllArticles from "./handlers/articles/articlesGSI/getAllbyGSI";
import getAllByGsi1 from "./handlers/articles/articlesGSI/getAllbyGSI";
import getAllByGSIWithSortKeyDate from "./handlers/articles/articlesGSI/getAllByGSIWithSortKeyDate";
import GSISkContains from "./handlers/articles/articlesGSI/GSISkContains";
import bodyParser from "body-parser";
import deleteArticleById from "./handlers/articles/deleteArticleById";
import getAllEntities from "./handlers/articles/getAllEntities";
import updateAnArticle from "./handlers/articles/updateArticle";

const router = express.Router();
router.use(bodyParser.json())

router.get('/healthcheck', healthcheck);

//get all types, ie SCAN
router.get('/getAllEntities', getAllEntities)

// article routes
router.get('/getArticleById/:id', getAllArticles);

// use this to get all articles
router.post('/getAllByGsi1', getAllByGsi1);

// update an article
router.post('/updateArticle', updateAnArticle);

//delete, update
router.delete('/deleteArticle', deleteArticleById);

router.post('/getAllByGSIWithSortKeyDate', getAllByGSIWithSortKeyDate);
router.post('/GSISkContains', GSISkContains);


export { router };
