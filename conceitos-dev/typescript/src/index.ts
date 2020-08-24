import express from 'express';

const app = express();
import { helloWord } from './routes';

app.get('/', helloWord);


app.listen(3333);

