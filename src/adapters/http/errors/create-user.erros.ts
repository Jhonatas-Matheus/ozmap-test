import { CreateUserDto } from "../../../domain/user.dto";
import { statusCode } from "../helpers/status-code";


export const handleCreateUserError = async (body: CreateUserDto) =>{
        if(!body || !body.name || !body.email || !body.age){
            return {body: {message: "All fields are Required (name - age - email)."}, statusCode: statusCode.BAD_REQUEST}
        }
        if(body.age < 18){
            return {body: {message: "Minimum age is 18 years"}, statusCode: statusCode.BAD_REQUEST}
        }
}