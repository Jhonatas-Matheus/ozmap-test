import Router from "koa-router";
import { createUserController, deleteUserController, listAllUsersController, listSpecificUserController, updateUserController } from "../factory";
import { CreateUserControllerKoa } from "../controllers/create-user.controller";
import { ListAllUsersControllerKoa } from "../controllers/list-all-usres.controller";
import { DeleteUserControllerKoa } from "../controllers/delete-user.controller";
import { UpdateUserControllerKoa } from "../controllers/update-user.controller";
import { ListSpecificUserControllerKoa } from "../controllers/list-specific-user.controller";


export const router = new Router()


const createUserControllerFactory = createUserController()
const createUserControllerKoa = new CreateUserControllerKoa(createUserControllerFactory)
router.post('/user', async (ctx)=> await createUserControllerKoa.handle(ctx))

const listAllUsersControllerFactory = listAllUsersController()
const listAllUsersControllerKoa = new ListAllUsersControllerKoa(listAllUsersControllerFactory)
router.get('/user', async (ctx)=> await listAllUsersControllerKoa.handle(ctx))

const deleteUserControllerFactory = deleteUserController()
const deleteUserControllerKoa = new DeleteUserControllerKoa(deleteUserControllerFactory)
router.delete('/user/:id', async (ctx)=> await deleteUserControllerKoa.handle(ctx))

const updateUserControllerFactory = updateUserController()
const updateUserControllerKoa = new UpdateUserControllerKoa(updateUserControllerFactory)
router.patch('/user/:id', async (ctx)=> await updateUserControllerKoa.handle(ctx))

const listSpecificUserControllerFactory = listSpecificUserController()
const listSpecificUserControllerKoa = new ListSpecificUserControllerKoa(listSpecificUserControllerFactory)
router.get('/user/:id', async (ctx)=> await listSpecificUserControllerKoa.handle(ctx))