import express, { Express } from 'express';
import { Controller } from '../controllers/Controller';
import container from '../../../config/dependency-injection';

const createOrderController = container.get('CreateOrderController') as Controller;
const orderListterController = container.get('UserOrdersController') as Controller;

const router = express.Router();

router.post("/", orderListterController.run);
router.post("/new", createOrderController.run);

export function register(app: Express) {
  app.use('/orders', router);
}
