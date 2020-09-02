import { UserSearcher } from "../../../context/epayco/user/application/UserSearcher";
import { Controller } from "./Controller";
import { Request, Response, NextFunction } from 'express';
import { isNullOrUndefined } from './isNullOrUndefined';
import { OrdersListter } from "../../../context/epayco/user/application/OrdersListter";
import httpStatus from "http-status";
import { InvalidArgumentError } from "../../../context/shared/domain/InvalidArgumentError";


export class UserOrdersController implements Controller {
  private ordersListter: OrdersListter;

  constructor(ordersListter: OrdersListter) {
    this.ordersListter = ordersListter;
    this.run = this.run.bind(this);
  }

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { document, phone } = req.body;

      isNullOrUndefined({ document, phone });

      const orders = await this.ordersListter.run({
        document,
        phone,
      });

      res.status(httpStatus.OK).json({ message: 'OK', data: { orders } });
    } catch (error) {
      const stack = error.stack as string;
      switch (true) {
        case stack.includes('UserNotFound'):
          res.status(httpStatus.NOT_FOUND).json({ message: error.message, data: null });
        case stack.includes('InvalidArgumentError'):
          res.status(httpStatus.BAD_REQUEST).json({ message: error.message, data: null });
        default:
          res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'server error', data: null });
      }
    }
  }
}