import { BalanceChecker } from "../../../context/epayco/user/application/BalanceChecker";
import { Controller } from "./Controller";
import { Request, Response } from 'express';
import httpStatus from "http-status";
import { isNullOrUndefined } from './isNullOrUndefined';


export class CheckBalanceController implements Controller {
  private checker: BalanceChecker;

  constructor(checker: BalanceChecker) {
    this.checker = checker;
    this.run = this.run.bind(this);
  }

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { document, phone } = req.body;

      isNullOrUndefined({ document, phone });

      const balance = await this.checker.run({
        document,
        phone,
      });

      res.status(httpStatus.OK).json({ message: 'OK', data: { balance } });
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