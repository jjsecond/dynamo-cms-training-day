import express from 'express';
import { router } from './routes';
import { run } from './file';

const app = express();
const port = 3050;


app.use(router);

run();


app.listen(port, ()=>console.log(`listening on port ${port}`))

export default router;