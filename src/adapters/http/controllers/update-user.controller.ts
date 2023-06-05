import { UpdateUserUseCase } from "../../../application/update-user.usecase";
import { handleUpdateUserError } from "../errors/update-user.errors";
import { statusCode } from "../helpers/status-code";
import { IHttpRequest, IHttpResponse } from "../interfaces";




export class UpdateUserController {
    constructor(private updateUserUseCase: UpdateUserUseCase){}
    async handle(iHttpRequest: IHttpRequest): Promise<IHttpResponse>{
        const errorResponse = await handleUpdateUserError(iHttpRequest.body)
        if(errorResponse){
            return errorResponse
        }
        try {
            const response = await this.updateUserUseCase.execute(iHttpRequest.id as string, iHttpRequest.body)
            return {body: response, statusCode: statusCode.OK}
        } catch (error: any) {
            if(error.message === "User not Found"){
            return {body: {message: error.message}, statusCode: statusCode.NOT_FOUND}
            }
            return {body: 'Internal Server Error', statusCode: statusCode.INTERNAL_SERVER_ERROR}
        }

    }
}