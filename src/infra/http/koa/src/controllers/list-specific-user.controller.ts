import { Request, Response } from "express";
import { ListSpecificUserController } from "../../../../../adapters/http/controllers/list-specif-user.controller";
import { Context } from "koa";



export class ListSpecificUserControllerKoa{
    constructor(private listSpecificUserController: ListSpecificUserController){}
    async handle(ctx: Context){
        const response = await this.listSpecificUserController.hanlde({id: ctx.params.id})
        ctx.status = response.statusCode
        ctx.body = response.body
    }
}