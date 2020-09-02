import { BalanceReloader } from "../../../context/epayco/user/application/BalanceReloader";
import { Controller } from "./Controller";
import { Request, Response } from 'express';
import httpStatus from "http-status";
import { InvalidArgumentError } from "../../../context/shared/domain/InvalidArgumentError";
import { isNullOrUndefined } from "./isNullOrUndefined";

export class ReloadBalanceController implements Controller {
  private reloader: BalanceReloader;

  constructor(reloader: BalanceReloader) {
    this.reloader = reloader;
    this.run = this.run.bind(this);
  }

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { document, phone, amount } = req.body;
      isNullOrUndefined({ document, phone, amount });
      await this.reloader.run({
        document,
        phone,
        amount
      });
      res.status(httpStatus.OK).json({ message: 'Balance reloaded successfully', data: null });
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