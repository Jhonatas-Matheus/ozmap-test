import { Context } from "koa";
import { CreateUserController } from "../../../../../adapters/http/controllers/create-user.controller";

export class CreateUserControllerKoa {
  constructor(private createUserController: CreateUserController) {}
  async handle(ctx: Context) {
    const response = await this.createUserController.handle({ body: ctx.request.body});
    ctx.status = response.statusCode;
    ctx.body = response.body;
  }
}
