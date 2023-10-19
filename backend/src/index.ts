import express from 'express';
import { router } from './routes';
import { run } from './file';
import bodyParser from 'body-parser';

const app = express();
const port = 3050;


app.use(router);

// parse application/json
app.use(bodyParser.json())


run();


app.listen(port, ()=>console.log(`listening on port ${port}`))

export default router;