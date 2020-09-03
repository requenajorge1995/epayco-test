import { PaymentConfirmer } from "../../../context/epayco/payments/application/PaymentConfirmer";
import { Controller } from "./Controller";
import { Request, Response } from 'express';
import httpStatus from "http-status";
import { isNullOrUndefined } from "./isNullOrUndefined";

export class ConfirmPaymentController implements Controller {
  private confirmer: PaymentConfirmer;

  constructor(confirmer: PaymentConfirmer) {
    this.confirmer = confirmer;
    this.run = this.run.bind(this);
  }

  async run(req: Request, res: Response): Promise<void> {
    try {
      res.cookie("bsaSession", req.session.id, { httpOnly: false });
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header('Access-Control-Allow-Credentials', 'true');
      const { token } = req.body;
      const orderId = req.session?.orderId;

      if (!orderId)
        throw new Error('InvalidSessionID');

      isNullOrUndefined({ token });
      await this.confirmer.run({
        orderId,
        token,
      });
      res.status(httpStatus.OK).json({ message: 'Payment confirmed and charged successfully', data: null });

    } catch (error) {
      const stack = error.stack as string;
      switch (true) {
        case stack.includes('InvalidSessionID'):
          res.status(httpStatus.FORBIDDEN).json({ message: 'Invalid session ID', data: null });
          break;
        case stack.includes('InvalidSecurityTokenError'):
          res.status(httpStatus.UNAUTHORIZED).json({ message: error.message, data: null });
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