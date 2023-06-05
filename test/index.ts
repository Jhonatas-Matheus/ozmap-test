import { expect } from "chai"
import { User } from "../src/domain/user.entity"


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