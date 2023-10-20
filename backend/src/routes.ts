import express from "express";
import { healthcheck } from "./handlers/healthcheck/healthCheck";
import getAllArticles from "./handlers/articles/articlesGSI/getAllbyGSI";
import getAllByGsi1 from "./handlers/articles/articlesGSI/getAllbyGSI";
import getAllByGSIWithSortKeyDate from "./handlers/articles/articlesGSI/getAllByGSIWithSortKeyDate";
import GSISkContains from "./handlers/articles/articlesGSI/GSISkContains";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json())

router.get('/healthcheck', healthcheck);

// article routes
router.get('/getArticleById/:id', getAllArticles);
router.get('/getAllByGsi1/:id', getAllByGsi1);
router.post('/getAllByGSIWithSortKeyDate', getAllByGSIWithSortKeyDate);
router.get('/GSISkContains/:id', GSISkContains);


export { router };
