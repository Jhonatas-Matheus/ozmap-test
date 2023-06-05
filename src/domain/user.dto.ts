
export interface CreateUserDto {
    name: string;
    age: number;
    email: string
}
export type UpdateUserDto ={
    name?: string;
    age?: number;
    email?: string
}
export type ListUserDto ={
    id: string;
    name: string;
    age: number;
    email: string
}