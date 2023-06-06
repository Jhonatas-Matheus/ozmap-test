import { ListSpecificUserUseCase } from "../../../application/list-specif-user.usecase";
import { statusCode } from "../helpers/status-code";
import { IHttpRequest, IHttpResponse } from "../interfaces";




export class ListSpecificUserController{
    constructor(private listSpecificUserUseCase: ListSpecificUserUseCase){}
    async hanlde(iHttpRequest: IHttpRequest): Promise<IHttpResponse>{
        try {
            const response = await this.listSpecificUserUseCase.execute(iHttpRequest.id as string)
            return {body: response, statusCode: statusCode.OK}
        } catch (error: any) {
            if(error.message === "User not found."){
                return {body: {message: error.message}, statusCode: statusCode.BAD_REQUEST}
            }
            return {body: {message: error.message}, statusCode: statusCode.INTERNAL_SERVER_ERROR}
        }

    }
}