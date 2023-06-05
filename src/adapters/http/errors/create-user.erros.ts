import { CreateUserDto } from "../../../domain/user.dto";
import { statusCode } from "../helpers/status-code";


export const handleCreateUserError = async (body: CreateUserDto) =>{
        if(!body || !body.name || !body.email || !body.age){
            return {body: {message: "Todos os campos são obrigatóritos (name - age - email)."}, statusCode: statusCode.BAD_REQUEST}
        }
        if(body.age < 18){
            console.log('Caiu no if da idade')
            return {body: {message: "A idade mínima é 18 anos."}, statusCode: statusCode.BAD_REQUEST}
        }
}