import express from "express";
import { healthcheck } from "./handlers/healthcheck/healthCheck";

const router = express.Router();

router.get('/healthcheck', healthcheck);

console.log('hi')


export { router };
