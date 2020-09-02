import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { registerRoutes } from './routes';
import { serverPort } from '../../config/index';

const app = express();

app.set('port', serverPort);

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

registerRoutes(app);

const server = app.listen(app.get('port'), () => {
  console.info(`App is running at http://localhost:${app.get('port')}`);
  console.log('Press CTRL-C to stop\n');
});

export default server;
