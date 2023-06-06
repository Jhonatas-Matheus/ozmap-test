import { expect, use } from "chai"
import { User } from "../src/domain/user.entity"
import { UserInMemoryRepository } from "../src/infra/db/inMemory/inMemory"
import { DataSource, DataSourceOptions, Repository } from "typeorm"
import UserTypeOrm from "../src/infra/db/typeorm/user.schema"
import { UserTypeormRepository } from "../src/infra/db/typeorm/user-typeorm.repository"
import { server } from "../src/infra/http/koa/src"
import chaiHttp from "chai-http"
import chai from "chai"
import { AppDataSource } from "../src/infra/db/typeorm/data-source"
chai.use(chaiHttp)

export const dataSourceConfig = (): DataSourceOptions=> {
  return process.env.DB_TYPE === 'document'?{
    type: 'sqlite',
  dropSchema: true,
  database: './src/infra/db/sqlite/database.sqlite',
  synchronize: true,
  logging: false,
  entities: [UserTypeOrm],
}:{
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [UserTypeOrm],
}
} 


const dataSource = new DataSource(dataSourceConfig())


describe("User Unit Tests Entity | Testes Unitários da Entidade de Usuário - Regras de negócio | (InMemory)", () => {
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
describe("UserInMemoryRepository Unit Tests All Methods | Testes Unitários do Repositório de Usuário Em memória Todos os Métodos | (InMemory)", ()=>{
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
describe("UserTypeormRepository Unit Tests All Methods | Testes Unitários do repositório de Usuário do typeorm Todos os Métodos | (InMemory - Document)",async ()=>{
  let connection: DataSource
  let typeormRepository: Repository<UserTypeOrm>
  let userTypeormRepository: UserTypeormRepository
  beforeEach(async()=>{
    connection = await dataSource.initialize()
    typeormRepository = dataSource.getRepository(UserTypeOrm)
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
describe("User Route Unit Tests '/user' | Testes Unitários da rota de Usuário '/user' | (InMemory - Document)",async ()=>{
  let connection: DataSource
  beforeEach(async()=>{
    if(!AppDataSource.isInitialized){
      connection = await AppDataSource.initialize()
    }
  })
  afterEach(async ()=>{
    await AppDataSource.destroy()
  })
  it("Should be able create a user by method POST | Deve ser capaz de criar um usuário através do método POST", async()=>{
   const response = await chai
      .request(server)
      .post('/user')
      .send({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
      expect(response).to.status(201)
      expect(response.body._name).to.equal('Raupp')
      expect(response.body._email).to.equal('jose.raupp@devoz.com.br')
      expect(response.body._age).to.equal(35)
      // .end((err,res)=>{
      //   expect(res).to.status(201)
      //   expect(res.body._name).to.equal('Raupp')
      //   expect(res.body._email).to.equal('jose.raupp@devoz.com.br')
      //   expect(res.body._age).to.equal(35)
      // })
  })
  it("Should be able list all users by method GET | Deve ser capaz de listar todos os usuário através do método GET",async()=>{
    await chai
      .request(server)
      .post('/user')
      .send({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
    await  chai
      .request(server)
      .post('/user')
      .send({name: "Silvia", email: "silvia@devoz.com.br", age: 25})
    await chai
      .request(server)
      .post('/user')
      .send({name: "Jhonatas", email: "jhonatas@devoz.com.br", age: 24})
    const response = await chai
      .request(server)
      .get('/user')
    expect(response.body).to.length(3)
  })
  it("Should be able delete user by method DELETE | Deve ser capaz de deletar um usuário através do método DELETE",async()=>{
    await chai
      .request(server)
      .post('/user')
      .send({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
    await  chai
      .request(server)
      .post('/user')
      .send({name: "Silvia", email: "silvia@devoz.com.br", age: 25})
    await chai
      .request(server)
      .post('/user')
      .send({name: "Jhonatas", email: "jhonatas@devoz.com.br", age: 24})
    const userToBeDeleted = await chai.request(server).get('/user')
    await chai
      .request(server)
      .delete(`/user/${userToBeDeleted.body[0]._id}`)
    const response = await chai
      .request(server)
      .get('/user')
    expect(response.body).to.length(2)
  })
  it("Should be able update user by method UPDATE | Deve ser capaz de atualizar um usuário através do método UPDATE",async()=>{
    await chai
      .request(server)
      .post('/user')
      .send({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
    await  chai
      .request(server)
      .post('/user')
      .send({name: "Silvia", email: "silvia@devoz.com.br", age: 25})
    await chai
      .request(server)
      .post('/user')
      .send({name: "Jhonatas", email: "jhonatas@devoz.com.br", age: 24})
    const listOfClients = await chai.request(server).get('/user')
    await chai
      .request(server)
      .patch(`/user/${listOfClients.body[0]._id}`)
      .send({name: "José"})
    await chai
      .request(server)
      .patch(`/user/${listOfClients.body[1]._id}`)
      .send({email: "silvia.guerreiro@devoz.com.br"})
    await chai
      .request(server)
      .patch(`/user/${listOfClients.body[2]._id}`)
      .send({age: 18})
    const response = await chai
      .request(server)
      .get('/user')
    expect(response.body).to.length(3)
    expect(response.body[0]._name).to.equal('José')
    expect(response.body[1]._email).to.equal('silvia.guerreiro@devoz.com.br')
    expect(response.body[2]._age).to.equal(18)


  })
  it("Should be able list specific user by method GET (/user/:id) | Deve ser capaz de listar um usuário específico do método GET (/user/:id)",async()=>{
    await chai
      .request(server)
      .post('/user')
      .send({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
    await  chai
      .request(server)
      .post('/user')
      .send({name: "Silvia", email: "silvia@devoz.com.br", age: 25})
    await chai
      .request(server)
      .post('/user')
      .send({name: "Jhonatas", email: "jhonatas@devoz.com.br", age: 24})
    const listOfClients = await chai.request(server).get('/user')
    const response = await chai
      .request(server)
      .get(`/user/${listOfClients.body[1]._id}`)
    expect(response.body._name).to.equal('Silvia')
    expect(response.body._email).to.equal('silvia@devoz.com.br')
    expect(response.body._age).to.equal(25)


  })
})

