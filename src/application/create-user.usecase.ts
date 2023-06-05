import { CreateUserDto } from "../domain/user.dto";
import { User } from "../domain/user.entity";
import { UserRepositoryInterface } from "../domain/user.repository";

export class CreateUserUseCase{
    constructor(private userRepository: UserRepositoryInterface){}
    async execute(user: CreateUserDto){
        const newUser = new User(user);
        const savedUser = await this.userRepository.save(newUser)
        return savedUser
    }
}