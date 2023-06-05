


export class InMemoryDatabase {
    constructor(){
        this.users = []
    }
    
    getAllUsers(){
        return this.users
    }

    saveUser(){
        this.users.push()
    }
}