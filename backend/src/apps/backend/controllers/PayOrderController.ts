import { OrderPayer } from "../../../context/epayco/payments/application/OrderPayer";
import { Controller } from "./Controller";
import { Request, Response } from 'express';
import httpStatus from "http-status";
import { isNullOrUndefined } from "./isNullOrUndefined";
import { InvalidArgumentError } from "../../../context/shared/domain/InvalidArgumentError";

export class PayOrderController implements Controller {
  private payer: OrderPayer;

  constructor(payer: OrderPayer) {
    this.payer = payer;
    this.run = this.run.bind(this);
  }

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.body;
      isNullOrUndefined({ orderId });
      await this.payer.run(orderId);
      req.session!.orderId = orderId;
      const sessionId = req.sessionID;
      res.status(httpStatus.OK).json({ message: 'Token sent successfully', data: { sessionId } });
    } catch (error) {
      const stack = error.stack as string;
      switch (true) {
        case stack.includes('OrderNotFound'):
          res.status(httpStatus.NOT_FOUND).json({ message: error.message, data: null });
          break;
        case stack.includes('OrderAlreadyPaidError'):
          res.status(httpStatus.PRECONDITION_REQUIRED).json({ message: error.message, data: null });
          break;
        case stack.includes('NotEnoughBalanceError'):
          res.status(httpStatus.PRECONDITION_FAILED).json({ message: error.message, data: null });
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