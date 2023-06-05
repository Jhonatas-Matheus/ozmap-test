import { CreateUserUseCase } from "../../../application/create-user.usecase";
import { ListUserDto, CreateUserDto } from "../../../domain/user.dto";
import { handleCreateUserError } from "../errors/create-user.erros";
import { statusCode } from "../helpers/status-code";
import { IHttpRequest, IHttpResponse } from "../interfaces";



export class CreateUserController{
    constructor(private createUserUseCase: CreateUserUseCase){}
    async handle(httpRequest: IHttpRequest):Promise<IHttpResponse>{
        const errorResponse = await handleCreateUserError(httpRequest.body)
        if(errorResponse){
            return errorResponse
        }
        try {
            const response = await this.createUserUseCase.execute(httpRequest.body)
            return {body: response, statusCode: statusCode.CREATED}
        } catch (error: any) {
            return {body: 'Internal Server Error', statusCode: statusCode.BAD_REQUEST}
        }
    }
}