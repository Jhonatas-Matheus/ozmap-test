import { ListUserDto, UpdateUserDto } from "../domain/user.dto";
import { UserRepositoryInterface } from "../domain/user.repository";

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepositoryInterface){}
    async execute(userId:string, updatedUserInfo: UpdateUserDto): Promise<ListUserDto>{
        const updatedUser = await this.userRepository.findAndUpdate(userId, updatedUserInfo)
        return updatedUser
    }
}