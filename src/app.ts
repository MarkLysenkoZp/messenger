import createHttpError from 'http-errors';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import indexRouter from './routes/index';
import signupRouter from './routes/signup';
import loginRouter from './routes/login';
import profileRouter from './routes/profile';
import logoutRouter from './routes/logout';
import userInfoRouter from './routes/api/userInfo';

const app: Express = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', signupRouter);
app.use('/', loginRouter);
app.use('/', profileRouter);
app.use('/', logoutRouter);
app.use('/', userInfoRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: any) => {
  next(createHttpError('404'));
});

// error handler
app.use((err: any, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
