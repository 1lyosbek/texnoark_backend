import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './config';


export const connectionSource: DataSourceOptions = {
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
    synchronize: true,
};

export default new DataSource(connectionSource)