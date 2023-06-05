import { expect, use } from "chai"
import { User } from "../src/domain/user.entity"
import { UserInMemoryRepository } from "../src/infra/db/inMemory/inMemory"
import { DataSource, Repository } from "typeorm"
import UserTypeOrm from "../src/infra/db/typeorm/user.schema"
import { AppDataSource } from "../src/infra/db/typeorm/data-source"
import { UserTypeormRepository } from "../src/infra/db/typeorm/user-typeorm.repository"


describe("User Unit Tests Entity | Testes Unitários da Entidade de Usuário - Regras de negócio", () => {
    it("Should be able to create a new user | Deve ser capaz de criar um usuário", () => {
      const userProps = {
        name: "Jhonatas",
        email: "jhonatas@gmail.com",
        age: 18,
      }
      const user = new User({ ...userProps })
      expect(user).to.instanceOf(User)
      expect(user).to.property("id")
    }),
      it("Most not be able to create a new user with age less than 18 | Não deve ser capaz de criar um novo usuário com menos de 18 anos", () => {
        const userProps = {
          name: "Jhonatas",
          email: "jhonatas@gmail.com",
          age: 17,
        }
        expect(() => new User({ ...userProps })).to.throw(Error)
      }),
      it("Should be able to update name of user | Deve ser capaz de atualizar o nome do usuário", () => {
        const userProps = {
          name: "Jhonatas",
          email: "jhonatas@gmail.com",
          age: 18,
        }
        const user = new User({ ...userProps })
        user.updateName("Matheus")
        expect(user.name).to.equal("Matheus")
      }),
      it("Should be able to update email of user | Deve ser capaz de atualizar o email do usuário", () => {
        const userProps = {
          name: "Jhonatas",
          email: "jhonatas@gmail.com",
          age: 18,
        }
        const user = new User({ ...userProps })
        user.updateEmail("matheus@gmail.com")
        expect(user.email).to.equal("matheus@gmail.com")
      }),
      it("Should be able to update age of user | Deve ser capaz de atualizar a idade do usuário", () => {
        const userProps = {
          name: "Jhonatas",
          email: "jhonatas@gmail.com",
          age: 18,
        }
        const user = new User({ ...userProps })
        user.updateAge(28)
        expect(user.age).to.equal(28)
      }),
      it("Most not be able to update age of user to less than 18 | Não deve ser capaz de atualizar a idade do usuário para menos de 18 anos", () => {
        const userProps = {
          name: "Jhonatas",
          email: "jhonatas@gmail.com",
          age: 18,
        }
        const user = new User({ ...userProps })
        expect(() => user.updateAge(15)).to.throw(Error)
      })
})
describe("UserInMemoryRepository Unit Tests All Methods | Testes Unitários do Repositório de Usuário Em memória Todos os Métodos", ()=>{
    let userInMemoryRepository: UserInMemoryRepository
    beforeEach(()=>{
        userInMemoryRepository = new UserInMemoryRepository()
    })
    it("Should be able to save user in database | Deve ser capaz de salvar um usuário no banco de dados.",async()=>{
        const user = new User({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
        await userInMemoryRepository.save(user)
        expect(userInMemoryRepository.users).to.have.length(1)
    })
    it("Should be able to list all users saved in database | Deve ser capaz de listar todos os usuários no banco de dados.",async ()=>{
        const user1 = new User({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
        const user2 = new User({name: "Silvia", email: "silvia@devoz.com.br", age: 25})
        const user3 = new User({name: "Jhonatas", email: "jose.raupp@devoz.com.br", age: 24})
        await userInMemoryRepository.save(user1)
        await userInMemoryRepository.save(user2)
        await userInMemoryRepository.save(user3)
        const listOfUsers = await userInMemoryRepository.listAll()
        expect(listOfUsers).to.have.length(3)
        expect(listOfUsers[0]).to.equal(user1)
        expect(listOfUsers[1]).to.equal(user2)
        expect(listOfUsers[2]).to.equal(user3)
    })
    it("Should be able to delete user saved in database by id | Deve ser capaz de deletar um usuário salvo no banco de dados através do id.", async ()=>{
        const user1 = new User({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
        const user2 = new User({name: "Silvia", email: "silvia@devoz.com.br", age: 25})
        const user3 = new User({name: "Jhonatas", email: "jose.raupp@devoz.com.br", age: 24})
        await userInMemoryRepository.save(user1)
        await userInMemoryRepository.save(user2)
        await userInMemoryRepository.save(user3)
        await userInMemoryRepository.delete(user2.id)
        const listOfUsers = await userInMemoryRepository.listAll()
        expect(listOfUsers).to.have.length(2)
        expect(listOfUsers[0]).to.equal(user1)
        expect(listOfUsers[1]).to.equal(user3)
        
    })
    it("Should be able to update user saved in database by id | Deve ser capaz de atualizar um usuário salvo no banco de dados através do id.", async ()=>{
        const user1 = new User({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
        const user2 = new User({name: "Silvia", email: "silvia@devoz.com.br", age: 25})
        const user3 = new User({name: "Jhonatas", email: "jhonatas@devoz.com.br", age: 24})
        await userInMemoryRepository.save(user1)
        await userInMemoryRepository.save(user2)
        await userInMemoryRepository.save(user3)
        await userInMemoryRepository.findAndUpdate(user1.id,{name: "José"})
        await userInMemoryRepository.findAndUpdate(user2.id,{email: "silvia.guerreiro@devoz.com.br"})
        await userInMemoryRepository.findAndUpdate(user3.id,{age: 18})
        const listOfUsers = await userInMemoryRepository.listAll()
        expect(listOfUsers).to.have.length(3)
        expect(listOfUsers[0].name).to.equal("José")
        expect(listOfUsers[1].email).to.equal("silvia.guerreiro@devoz.com.br")
        expect(listOfUsers[2].age).to.equal(18)
    })
    it("Should be able to list specific user saved in database by id | Deve ser capaz de atualizar um usuário salvo no banco de dados através do id.", async()=>{
        const user1 = new User({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
        const user2 = new User({name: "Silvia", email: "silvia@devoz.com.br", age: 25})
        const user3 = new User({name: "Jhonatas", email: "jose.raupp@devoz.com.br", age: 24})
        await userInMemoryRepository.save(user1)
        await userInMemoryRepository.save(user2)
        await userInMemoryRepository.save(user3)  
        const userFound = await userInMemoryRepository.listSpecificUser(user2.id)
        expect(userFound.name).to.equal('Silvia')
    })
})
describe("UserTypeormRepository Unit Tests All Methods | Testes Unitários do repositório de Usuário do typeorm Todos os Métodos | (InMemory - Document)",()=>{
  let connection: DataSource
  let typeormRepository: Repository<UserTypeOrm>
  let userTypeormRepository: UserTypeormRepository
  beforeEach(async()=>{
    connection = await AppDataSource.initialize()
    typeormRepository = AppDataSource.getRepository(UserTypeOrm)
    userTypeormRepository = new UserTypeormRepository(typeormRepository)
  })
  afterEach(async ()=>{
    await connection.destroy()
  })
  it("Should be able to save user in database | Deve ser capaz de salvar um usuário no banco de dados.",async()=>{
    const user = new User({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
    await userTypeormRepository.save(user)
    const listOfUsers = await userTypeormRepository.listAll()
    expect(listOfUsers).to.have.length(1)
  })
  it("Should be able to list all users saved in database | Deve ser capaz de listar todos os usuários no banco de dados.",async ()=>{
  const user1 = new User({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
  const user2 = new User({name: "Silvia", email: "silvia@devoz.com.br", age: 25})
  const user3 = new User({name: "Jhonatas", email: "jose.raupp@devoz.com.br", age: 24})
  await userTypeormRepository.save(user1)
  await userTypeormRepository.save(user2)
  await userTypeormRepository.save(user3)
  const listOfUsers = await userTypeormRepository.listAll()
  expect(listOfUsers).to.have.length(3)
  expect(listOfUsers[0].name).to.equal(user1.name)
  expect(listOfUsers[1].name).to.equal(user2.name)
  expect(listOfUsers[2].name).to.equal(user3.name)
  })
  it("Should be able to delete user saved in database by id | Deve ser capaz de deletar um usuário salvo no banco de dados através do id.", async ()=>{
    const user1 = new User({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
    const user2 = new User({name: "Silvia", email: "silvia@devoz.com.br", age: 25})
    const user3 = new User({name: "Jhonatas", email: "jose.raupp@devoz.com.br", age: 24})
    await userTypeormRepository.save(user1)
    await userTypeormRepository.save(user2)
    await userTypeormRepository.save(user3)
    await userTypeormRepository.delete(user2.id)
    const listOfUsers = await userTypeormRepository.listAll()
    expect(listOfUsers).to.have.length(2)
    expect(listOfUsers[0].name).to.equal(user1.name)
    expect(listOfUsers[1].name).to.equal(user3.name)
    
  })
  it("Should be able to update user saved in database by id | Deve ser capaz de atualizar um usuário salvo no banco de dados através do id.", async ()=>{
    const user1 = new User({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
    const user2 = new User({name: "Silvia", email: "silvia@devoz.com.br", age: 25})
    const user3 = new User({name: "Jhonatas", email: "jhonatas@devoz.com.br", age: 24})
    await userTypeormRepository.save(user1)
    await userTypeormRepository.save(user2)
    await userTypeormRepository.save(user3)
    await userTypeormRepository.findAndUpdate(user1.id,{name: "José"})
    await userTypeormRepository.findAndUpdate(user2.id,{email: "silvia.guerreiro@devoz.com.br"})
    await userTypeormRepository.findAndUpdate(user3.id,{age: 18})
    const listOfUsers = await userTypeormRepository.listAll()
    expect(listOfUsers).to.have.length(3)
    expect(listOfUsers[0].name).to.equal("José")
    expect(listOfUsers[1].email).to.equal("silvia.guerreiro@devoz.com.br")
    expect(listOfUsers[2].age).to.equal(18)
  })
  it("Should be able to list specific user saved in database by id | Deve ser capaz de atualizar um usuário salvo no banco de dados através do id.", async()=>{
    const user1 = new User({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
    const user2 = new User({name: "Silvia", email: "silvia@devoz.com.br", age: 25})
    const user3 = new User({name: "Jhonatas", email: "jose.raupp@devoz.com.br", age: 24})
    await userTypeormRepository.save(user1)
    await userTypeormRepository.save(user2)
    await userTypeormRepository.save(user3)  
    const userFound = await userTypeormRepository.listSpecificUser(user2.id)
    expect(userFound.name).to.equal('Silvia')
  })
})
// describe("User Unit Tests UseCases With Database | Testes Uniários dos Casos de Uso do Usuário Com Banco de dados. ", async () => {
//   let connection: DataSource
//   let newInMemoryDatabase: Repository<UserTypeOrm>
//   before(async () => {
//     const connectionExists = AppDataSource.isInitialized
//     if (connectionExists) {
//       await AppDataSource.destroy()
//     }
//     connection = await AppDataSource.initialize()
//     newInMemoryDatabase = AppDataSource.getRepository(UserTypeOrm)
//   })
//   beforeEach(async () => {
//     // await connection.synchronize(true)
//     const connectionExists = AppDataSource.isInitialized
//     if (connectionExists) {
//       await AppDataSource.destroy()
//     }
//     connection = await AppDataSource.initialize()
//     newInMemoryDatabase = AppDataSource.getRepository(UserTypeOrm);
//   })
//   afterEach(async () => {
//     // await connection.dropDatabase()
//     await connection.destroy()
//   })
//   it("Should be able to save a user in in-memory database | Deve ser capaz de salvar o usuário no banco de dados em memória.", async () => {
//     const userTypeOrmRepository = new UserTypeormRepository(newInMemoryDatabase)
//     const createUserUseCase = new CreateUserUseCase(userTypeOrmRepository)
//     const liseAllUserUseCase = new ListAllUsersUseCase(userTypeOrmRepository)
//     const userProps1 = {
//       name: "Jhonatas",
//       email: "jhonatas@gmail.com",
//       age: 18,
//     }
//     const userProps2 = {
//       name: "Matheus",
//       email: "matheus@gmail.com",
//       age: 20,
//     }
//     const savedUser1 = await createUserUseCase.execute({ ...userProps1 })
//     const savedUser2 = await createUserUseCase.execute({ ...userProps2 })
//     const response = await liseAllUserUseCase.execute()
//     expect(response).to.length(2)
//   })
//   it("Should be able to delete a user in in-memory database | Deve ser capaz de deletar o usuário no banco de dados em memória.", async () => {
//     const userTypeOrmRepository = new UserTypeormRepository(newInMemoryDatabase)
//     const createUserUseCase = new CreateUserUseCase(userTypeOrmRepository)
//     const deleteUserUseCase = new DeleteUserUseCase(userTypeOrmRepository)
//     const listAllUsersUseCase = new ListAllUsersUseCase(userTypeOrmRepository)
//     const userProps1 = {
//       name: "Jhonatas",
//       email: "jhonatas@gmail.com",
//       age: 18,
//     }
//     const userProps2 = {
//       name: "Matheus",
//       email: "matheus@gmail.com",
//       age: 20,
//     }
//     const userProps3 = {
//       name: "Julio",
//       email: "julio@gmail.com",
//       age: 24,
//     }
//     const savedUser1 = await createUserUseCase.execute({ ...userProps1 })
//     const savedUser2 = await createUserUseCase.execute({ ...userProps2 })
//     const savedUser3 = await createUserUseCase.execute({ ...userProps3 })
//     await deleteUserUseCase.execute(savedUser2.id)
//     const response = await listAllUsersUseCase.execute()
//     expect(response).to.length(2)
//   })
//   it("Should be able list all users in in-memory database | Deve ser capaz de listar todos os usuários no banco de dados em memória.", async () => {
//     const userTypeOrmRepository = new UserTypeormRepository(newInMemoryDatabase)
//     const createUserUseCase = new CreateUserUseCase(userTypeOrmRepository)
//     const listAllUsersUseCase = new ListAllUsersUseCase(userTypeOrmRepository)
//     const userProps1 = {
//       name: "Jhonatas",
//       email: "jhonatas@gmail.com",
//       age: 18,
//     }
//     const userProps2 = {
//       name: "Matheus",
//       email: "matheus@gmail.com",
//       age: 20,
//     }
//     const userProps3 = {
//       name: "Julio",
//       email: "julio@gmail.com",
//       age: 24,
//     }
//     const savedUser1 = await createUserUseCase.execute({ ...userProps1 })
//     const savedUser2 = await createUserUseCase.execute({ ...userProps2 })
//     const savedUser3 = await createUserUseCase.execute({ ...userProps3 })
//     const response = await listAllUsersUseCase.execute()
//     expect(response).to.length(3)
//     expect(response[0].id).to.equal(savedUser1.id)
//     expect(response[0]).to.deep.equal(savedUser1)
//   })
//   it("Should be able list specific user in in-memory database | Deve ser capaz de lista um usuário no banco de dados em memória.", async () => {
//     const userTypeOrmRepository = new UserTypeormRepository(newInMemoryDatabase)
//     const createUserUseCase = new CreateUserUseCase(userTypeOrmRepository)
//     const listSpecificUserUseCase = new ListSpecificUserUseCase(
//       userTypeOrmRepository
//     )
//     const userProps1 = {
//       name: "Jhonatas",
//       email: "jhonatas@gmail.com",
//       age: 18,
//     }
//     const userProps2 = {
//       name: "Matheus",
//       email: "matheus@gmail.com",
//       age: 20,
//     }
//     const userProps3 = {
//       name: "Julio",
//       email: "julio@gmail.com",
//       age: 24,
//     }
//     const savedUser1 = await createUserUseCase.execute({ ...userProps1 })
//     const savedUser2 = await createUserUseCase.execute({ ...userProps2 })
//     const savedUser3 = await createUserUseCase.execute({ ...userProps3 })
//     const response = await listSpecificUserUseCase.execute(savedUser2.id)
//     expect(response.name).to.equal("Matheus")
//   }),
//     it("Should be able update a user in in-memory database | Deve ser capaz de atualizar um usuário no banco de dados em memória.", async () => {
//       const userTypeOrmRepository = new UserTypeormRepository(
//         newInMemoryDatabase
//       )
//       const createUserUseCase = new CreateUserUseCase(userTypeOrmRepository)
//       const updateUserUseCase = new UpdateUserUseCase(userTypeOrmRepository)
//       const userProps1 = {
//         name: "Jhonatas",
//         email: "jhonatas@gmail.com",
//         age: 18,
//       }
//       const userProps2 = {
//         name: "Matheus",
//         email: "matheus@gmail.com",
//         age: 20,
//       }
//       const userProps3 = {
//         name: "Julio",
//         email: "julio@gmail.com",
//         age: 24,
//       }
//       const savedUser1 = await createUserUseCase.execute({ ...userProps1 })
//       const savedUser2 = await createUserUseCase.execute({ ...userProps2 })
//       const savedUser3 = await createUserUseCase.execute({ ...userProps3 })
//       const response = await updateUserUseCase.execute(savedUser1.id, {
//         email: "oliveira021@mail.com",
//       })
//       expect(response.name).to.equal("Jhonatas")
//       expect(response.email).to.equal("oliveira021@mail.com")
//     })
// })