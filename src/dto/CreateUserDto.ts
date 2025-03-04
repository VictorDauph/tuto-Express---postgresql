export interface CreateUserDtoIn {
    name: string;
    password: string,
    email: string;
    age: number;
}

export interface CreateUserDtoOut {
    id: string;
    name: string;
    email: string;
    age: number;
    addedAt: Date;
}