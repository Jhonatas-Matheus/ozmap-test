import { use } from "chai";
import { CreateUserDto, ListUserDto, UpdateUserDto } from "../../../domain/user.dto";
import { User } from "../../../domain/user.entity";
import { UserRepositoryInterface } from "../../../domain/user.repository";



export class UserInMemoryRepository implements UserRepositoryInterface {
    users: User[]
    constructor(){
        this.users= []
    }
    async save(user: User): Promise<User> {
        this.users.push(user)
        return user
    }
    async listSpecificUser(userId: string): Promise<User> {
        const userFound = this.users.find((user)=> user.id === userId)
        if(userFound){
            return userFound
        }
        throw new Error("User not found");
    }
    async listAll(): Promise<User[]> {
        return this.users
    }
    async findAndUpdate(userId: string, updatedUserInfo: UpdateUserDto): Promise<User> {
        const userToBeUpdated = this.users.find((user)=> user.id === userId)
        const userToBeUpdatedIndex = this.users.findIndex((user)=> user.id === userId)
        if(userToBeUpdated){
            const currentUser = new User(userToBeUpdated)
            if(updatedUserInfo.age){
                currentUser.updateAge(updatedUserInfo.age)
            }
            if(updatedUserInfo.name){
                currentUser.updateName(updatedUserInfo.name)
            }
            if(updatedUserInfo.email){
                currentUser.updateEmail(updatedUserInfo.email)
            }
            this.users.splice(userToBeUpdatedIndex,1, currentUser)
            return currentUser
        }
        throw new Error("User not found");
    }
    async delete(idUser: string): Promise<void> {
        const userToBeDeleted = this.users.findIndex(user=> user.id === idUser)
        if(userToBeDeleted){
           this.users.splice(userToBeDeleted,1)
           return
        }
        throw new Error("User not found");
    }
    

}