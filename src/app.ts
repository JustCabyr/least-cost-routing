import express, {
  Application,
  json,
  Request,
  Response,
} from 'express';
import RoutesV1 from './api/routes/v1';
import { port as EnvPort } from './config';


const app: Application = express();
export const port = process.env.PORT || EnvPort;

app.set('port', port);
app.use(json({ limit: '10mb' }));

// Index route
app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: `Welcome to Montech Scaffold Server`,
  });
});

//middleware for routes
app.use('/v1', RoutesV1);


export default app;
