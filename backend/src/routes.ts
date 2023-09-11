import express from "express";
import { healthcheck } from "./handlers/healthcheck/healthCheck";
import getAllArticles from "./handlers/articles/articlesGSI/getAllbyGSI";
import getAllByGsi1 from "./handlers/articles/articlesGSI/getAllbyGSI";
import getAllByGSIWithSortKeyDate from "./handlers/articles/articlesGSI/getAllByGSIWithSortKeyDate";
import GSISkContains from "./handlers/articles/articlesGSI/GSISkContains";

const router = express.Router();

router.get('/healthcheck', healthcheck);

// article routes
router.get('/getArticleById/:id', getAllArticles);
router.get('/getAllByGsi1/:id', getAllByGsi1);
router.get('/getAllByGSIWithSortKeyDate/:id', getAllByGSIWithSortKeyDate);
router.get('/GSISkContains/:id', GSISkContains);


export { router };
