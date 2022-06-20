import 'dotenv/config';

import express from 'express';

import {routes} from './routes';

const app = express();

app.use(routes);

app.listen(9000, () => {
  console.log('Server is running on PORT 9000');
});