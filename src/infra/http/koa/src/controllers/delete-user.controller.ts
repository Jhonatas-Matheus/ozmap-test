import { Request, Response } from "express";
import { DeleteUserController } from "../../../../../adapters/http/controllers/delete-user.controller";
import { Context } from "koa";




export class DeleteUserControllerKoa{
    constructor(private deleteUserController: DeleteUserController){}
    async handle(ctx: Context){
        const response = await this.deleteUserController.handle({id: ctx.params.id})
        ctx.status = response.statusCode
        ctx.body = response.body
    }

}