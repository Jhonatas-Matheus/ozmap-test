import { UserRepositoryInterface } from "../domain/user.repository";

export class DeleteUserUseCase{
    constructor(private userRepository: UserRepositoryInterface){}
    async execute(userId: string){
        try {
            const resposne = await this.userRepository.delete(userId)
            return resposne
        } catch (error: any ) {
            console.log(error)
            throw new Error(error.message)
        }
    }
}