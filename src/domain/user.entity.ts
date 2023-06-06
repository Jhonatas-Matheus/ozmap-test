import crypto from "crypto";

export type UserProps = {
  id?: string;
  name: string;
  email: string;
  age: number;
};

export class User {
  private _id: Required<string>;
  private _age: Required<number>;
  private _email: Required<string>;
  private _name: Required<string>;
  constructor({ age, email, name, id }: UserProps) {
    this._id = id ?? crypto.randomUUID();
    if(age < 18 ){
      throw new Error("Minimum age is 18 years")
    }
    this._age = age
    this._email = email;
    this._name = name;
  }
  public updateName(newName: string): void{
    this.name = newName
  }
  public updateEmail(newEmail: string): void{
    this.email = newEmail
  }
  public updateAge(newAge: number): void{
    if(newAge < 18){
      throw new Error("Minimum age is 18 years");
    }
    this.age = newAge
  }
  get id(): string{
    return this._id
  }
  get name(): string{
    return this._name
  }
  get email(): string{
    return this._email
  }
  get age(): number{
    return this._age
  }
  private set id(newId: string){
    this._id = newId
  }
  private set name(newName: string){
    this._name = newName
  }
  private set email(newEmail: string){
    this._email = newEmail
  }
  private set age(newAge: number){
    this._age = newAge
  }  
}
