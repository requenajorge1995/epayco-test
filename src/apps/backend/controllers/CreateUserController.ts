import { UserCreator } from "../../../context/epayco/user/application/UserCreator";
import { Controller } from "./Controller";
import { Request, Response } from 'express';
import httpStatus from "http-status";
import { InvalidArgumentError } from "../../../context/shared/domain/InvalidArgumentError";
import { isNullOrUndefined } from "./isNullOrUndefined";

export class CreateUserController implements Controller {
  private creator: UserCreator;

  constructor(creator: UserCreator) {
    this.creator = creator;
    this.run = this.run.bind(this);
  }

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { document, name, email, phone } = req.body;
      isNullOrUndefined({ document, name, email, phone });
      await this.creator.run({
        document,
        name,
        email,
        phone,
      });
      res.status(httpStatus.CREATED).json({ message: 'User created successfully', data: null });
    } catch (error) {
      const stack = error.stack as string;
      switch (true) {
        case stack.includes('UserAlreadyExistError'):
          res.status(httpStatus.CONFLICT).json({ message: error.message, data: null });
        case stack.includes('InvalidArgumentError'):
          res.status(httpStatus.BAD_REQUEST).json({ message: error.message, data: null });
        default:
          res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'server error', data: null });
      }
    }
  }
}