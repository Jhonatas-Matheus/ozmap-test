import { CreateUserDto } from "../../../domain/user.dto";
import { statusCode } from "../helpers/status-code";


export const handleUpdateUserError = async (body: CreateUserDto) =>{
        if(body.age < 18){
            console.log('Caiu no if da idade')
            return {body: {message: "A idade mínima é 18 anos."}, statusCode: statusCode.BAD_REQUEST}
        }
}