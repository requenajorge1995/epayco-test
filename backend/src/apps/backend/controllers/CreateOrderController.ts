import { OrderCreator } from "../../../context/epayco/order/application/OrderCreator";
import { Controller } from "./Controller";
import { Request, Response } from 'express';
import httpStatus from "http-status";
import { isNullOrUndefined } from "./isNullOrUndefined";

export class CreateOrderController implements Controller {
  private creator: OrderCreator;

  constructor(creator: OrderCreator) {
    this.creator = creator;
    this.run = this.run.bind(this);
  }

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { document, phone, total } = req.body;
      isNullOrUndefined({ document, phone, total });
      await this.creator.run({
        document,
        phone,
        total: parseFloat(total),
      });
      res.status(httpStatus.CREATED).json({ message: 'Order created successfully', data: null });
    } catch (error) {
      const stack = error.stack as string;
      switch (true) {
        case stack.includes('UserNotFound'):
          res.status(httpStatus.NOT_FOUND).json({ message: error.message, data: null });
          break;
        case stack.includes('InvalidArgumentError'):
          res.status(httpStatus.BAD_REQUEST).json({ message: error.message, data: null });
          break;
        default:
          res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'server error', data: null });
      }
    }
  }
}