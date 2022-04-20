import express, {
  Application,
  json,
  Request,
  Response,
  NextFunction,
} from 'express';
import RoutesV1 from './api/routes/v1';
import { port as EnvPort } from './config';
import { ApiError, InternalError, NotFoundError } from './core/ApiError';


const app: Application = express();
export const port = process.env.PORT || EnvPort;

app.set('port', port);
app.use(json({ limit: '10mb' }));

// Index route
app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: `Hello Server`,
  });
});

//middleware for routes
app.use('/v1', RoutesV1);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

//custom error handler for all routes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    // if (environment === "development") {
    //   Logger.error(err);
    //   return res.status(500).send(err.message);
    // }
    ApiError.handle(new InternalError(), res);
  }
});


export default app;
