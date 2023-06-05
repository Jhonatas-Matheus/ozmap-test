import { UserRepositoryInterface } from "../domain/user.repository";

export class ListSpecificUserUseCase{
    constructor(private userRepository: UserRepositoryInterface){}
    async execute(userId: string){
        const currentUser = await this.userRepository.listSpecificUser(userId)
        return currentUser
    }
}