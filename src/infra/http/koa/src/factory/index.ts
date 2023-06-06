import { CreateUserController } from "../../../../../adapters/http/controllers/create-user.controller"
import { DeleteUserController } from "../../../../../adapters/http/controllers/delete-user.controller"
import { ListAllUserController } from "../../../../../adapters/http/controllers/list-all-users.controller"
import { ListSpecificUserController } from "../../../../../adapters/http/controllers/list-specif-user.controller"
import { UpdateUserController } from "../../../../../adapters/http/controllers/update-user.controller"
import { CreateUserUseCase } from "../../../../../application/create-user.usecase"
import { DeleteUserUseCase } from "../../../../../application/delete-user.usecase"
import { ListAllUsersUseCase } from "../../../../../application/list-all-users.usecase"
import { ListSpecificUserUseCase } from "../../../../../application/list-specif-user.usecase"
import { UpdateUserUseCase } from "../../../../../application/update-user.usecase"
import { AppDataSource } from "../../../../db/typeorm/data-source"
import { UserTypeormRepository } from "../../../../db/typeorm/user-typeorm.repository"
import UserTypeOrm from "../../../../db/typeorm/user.schema"


const userTypeOrmRepository = new UserTypeormRepository(AppDataSource.getRepository(UserTypeOrm))

export const createUserController = (): CreateUserController =>{
    const  createUserUseCase = new CreateUserUseCase(userTypeOrmRepository)
    const  createUserController = new CreateUserController(createUserUseCase)
    return createUserController
}
export const listAllUsersController = (): ListAllUserController =>{
    const listAllUsersUseCase = new ListAllUsersUseCase(userTypeOrmRepository)
    const listAllUsersController = new ListAllUserController(listAllUsersUseCase)
    return listAllUsersController
}

export const deleteUserController = (): DeleteUserController => {
    const deleteUserUseCase = new DeleteUserUseCase(userTypeOrmRepository)
    const deleteUserController = new DeleteUserController(deleteUserUseCase)
    return deleteUserController
}

export const updateUserController = (): UpdateUserController => {
    const updateUserUseCase = new UpdateUserUseCase(userTypeOrmRepository)
    const updateUserController = new UpdateUserController(updateUserUseCase)
    return updateUserController
}

export const listSpecificUserController = (): ListSpecificUserController => {
    const listSpecificUserUseCase = new ListSpecificUserUseCase(userTypeOrmRepository)
    const listSpecificUserController = new ListSpecificUserController(listSpecificUserUseCase)
    return listSpecificUserController
}