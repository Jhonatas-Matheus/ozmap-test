import { ListAllUsersUseCase } from "../../../application/list-all-users.usecase";
import { statusCode } from "../helpers/status-code";
import { IHttpRequest, IHttpResponse } from "../interfaces";





export class ListAllUserController{
    constructor(private listAllUSersUseCase: ListAllUsersUseCase){}
    async handle(): Promise<IHttpResponse>{
        try {
            const response = await this.listAllUSersUseCase.execute()
            return {body: response, statusCode:statusCode.OK}
        } catch (error) {
            return {body: 'Internal Server Error', statusCode: statusCode.INTERNAL_SERVER_ERROR}
        }
    }
}