import * as dotenv from 'dotenv';
import { IConfig } from '../types/types';
dotenv.config();

export const config: IConfig = {
    serverPort: Number(process.env.SERVER_PORT),
    dbPort: Number(process.env.DATABASE_PORT),
    dbHost: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE,
    dbUser: process.env.DATABASE_USER,
    dbPassword: process.env.DATABASE_PASSWORD,
    jwtKey: process.env.JWT_ACCESS_SECRET_KEY,
    jwtExpiresIn: process.env.JWT_ACCESS_EXPIRATION,
    jwtRefreshKey: process.env.JWT_REFRESH_SECRET_KEY,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION,
    jwtCookieTime: Number(process.env.COOKIE_TIME),
};