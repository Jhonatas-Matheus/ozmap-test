import { ListUserDto } from "../domain/user.dto";
import { User } from "../domain/user.entity";
import { UserRepositoryInterface } from "../domain/user.repository";

export class ListAllUsersUseCase {
    constructor(private userRepository: UserRepositoryInterface){}
    async execute(): Promise<User[]> {
        const allUsers = await this.userRepository.listAll()
        return allUsers
    }
}