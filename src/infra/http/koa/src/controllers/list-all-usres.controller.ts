import { Request, Response } from "express";
import { ListAllUserController } from "../../../../../adapters/http/controllers/list-all-users.controller";
import { Context } from "koa";


export class ListAllUsersControllerKoa{
    constructor(private listaAllUsersControler: ListAllUserController){}
    async handle(ctx: Context){
        const response = await this.listaAllUsersControler.handle()
        ctx.status = response.statusCode
        ctx.body = response.body
    }
}