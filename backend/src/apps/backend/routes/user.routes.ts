import express, { Express } from 'express';
import { Controller } from '../controllers/Controller';
import container from '../../../config/dependency-injection';

const createUserController = container.get('CreateUserController') as Controller;
const checkBalanceController = container.get('CheckBalanceController') as Controller;
const reloadBalanceController = container.get('ReloadBalanceController') as Controller;

const router = express.Router();

router.post("/new", createUserController.run);
router.post("/balance", checkBalanceController.run);
router.post("/reload", reloadBalanceController.run);

export function register(app: Express) {
  app.use('/user', router);
}
