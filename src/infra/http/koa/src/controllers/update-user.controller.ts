import { Request, Response } from "express";
import { UpdateUserController } from "../../../../../adapters/http/controllers/update-user.controller";
import { Context } from "koa";




export class UpdateUserControllerKoa{
    constructor(private updateUserController: UpdateUserController){}
    async handle(ctx: Context){
        const response = await this.updateUserController.handle({id: ctx.params.id, body: ctx.request.body})
        ctx.status = response.statusCode
        ctx.body = response.body
    }
}