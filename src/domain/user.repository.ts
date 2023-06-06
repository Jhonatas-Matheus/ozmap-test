import { UpdateUserDto } from "./user.dto";
import { User } from "./user.entity";



export interface UserRepositoryInterface{
    save(user: User): Promise<User>;
    listSpecificUser(userId:string):Promise<User>
    listAll(): Promise<User[]>;
    findAndUpdate(userId: string, updatedUserInfo: UpdateUserDto): Promise<User>
    delete(idUser: string): Promise<void>;
}
