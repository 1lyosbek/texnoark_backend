import { RoleEnum } from "../enums/enums";


export interface IConfig {
    serverPort: number,
    dbPort: number;
    dbHost: string;
    dbName: string;
    dbUser: string;
    dbPassword: string;
    jwtKey: string;
    jwtExpiresIn: string;
}

export interface ICurrentUser {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: RoleEnum;
    email: string;
    password: string;
}