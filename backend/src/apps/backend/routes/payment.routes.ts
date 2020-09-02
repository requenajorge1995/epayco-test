import express, { Express, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { Controller } from '../controllers/Controller';
import container from '../../../config/dependency-injection';

const payOrderController = container.get('PayOrderController') as Controller;
const confirmPaymentController = container.get('ConfirmPaymentController') as Controller;

const router = express.Router();

router.use(function getSessionByBody(req: Request, res: Response, next: NextFunction) {
  req.cookies = { 'connect.sid': req.query.sessionId };
  next();
});

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

router.post("/pay-order", payOrderController.run);
router.post("/confirm-payment", confirmPaymentController.run);

export function register(app: Express) {
  app.use('/payments', router);
}

