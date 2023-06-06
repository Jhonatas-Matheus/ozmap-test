import { CreateUserDto } from "../../../domain/user.dto";
import { statusCode } from "../helpers/status-code";


export const handleUpdateUserError = async (body: CreateUserDto) =>{
    if(!body.age && !body.name && !body.email){
        return {body: {message: "You are trying to do an update without providing data for changes"}, statusCode: statusCode.BAD_REQUEST}
    }
    if(body.age < 18){
        return {body: {message: "Minimum age is 18 years"}, statusCode: statusCode.BAD_REQUEST}
    }
}