import { DeleteUserUseCase } from "../../../application/delete-user.usecase";
import { statusCode } from "../helpers/status-code";
import { IHttpRequest, IHttpResponse } from "../interfaces";



export class DeleteUserController{
    constructor(private deleteUserUsecase: DeleteUserUseCase){}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        try {
            const response = await this.deleteUserUsecase.execute(httpRequest.id as string)
            return {body: response, statusCode: statusCode.NO_CONTENT}
        } catch (error: any) {
            if(error.message === "User not found"){
                return {body: {message: error.message}, statusCode: statusCode.BAD_REQUEST}
            }
            return {body: {message: error.message}, statusCode: statusCode.INTERNAL_SERVER_ERROR}
        }
    }
}