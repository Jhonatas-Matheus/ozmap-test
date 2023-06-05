import { Repository } from "typeorm";
import { UpdateUserDto } from "../../../domain/user.dto";
import { User } from "../../../domain/user.entity";
import { UserRepositoryInterface } from "../../../domain/user.repository";
import UserTypeOrm from "./user.schema";

export class UserTypeormRepository implements UserRepositoryInterface {
  constructor(private repository: Repository<UserTypeOrm>) {}

  async save(user: User): Promise<User> {
    try {
      const userCreated = await this.repository.save(user);
      return userCreated;
    } catch (error: any) {
      return error.message
    }
  }
  async listSpecificUser(userId: string): Promise<User> {
    const userFound = await this.repository.findOneBy({id: userId})
    if(userFound){
      const currentUser = new User(userFound)
      return currentUser
    }
    throw new Error("User not found.");

  }
  async listAll(): Promise<User[]> {
    const userFound = await this.repository.find();
    const tratedUsers = userFound.map((user)=> new User({...user}))
    return tratedUsers;
  }
  async findAndUpdate(
    userId: string,
    updatedUserInfo: UpdateUserDto
  ): Promise<User> {
    const userAlreadyExists = await this.repository.findOneBy({ id: userId });
    if(!userAlreadyExists){
      console.log('Caiu no if')
      throw new Error("User not Found")
    }
    try {
      const userUpdate = await this.repository.update({ id: userId },{...updatedUserInfo});
      const userFound = await this.repository.findOneBy({ id: userId });
      const currentUser = new User(userFound as UserTypeOrm);
      return currentUser;
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  async delete(idUser: string): Promise<void> {
    const userToBeDeleted = await this.repository.findOneBy({id: idUser})
    if(!userToBeDeleted){
      throw new Error("User not found");
    }
    try {
        await this.repository.delete({id:idUser})
    } catch (error) {
        console.log(error)
        throw new Error("Internal Server Error");
    }

  }
}
