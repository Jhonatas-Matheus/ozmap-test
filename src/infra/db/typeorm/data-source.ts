import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config'
import UserTypeOrm from "./user.schema";

export const dataSourceConfig = (): DataSourceOptions=> {
    return process.env.DB_TYPE === 'memory'?{
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [UserTypeOrm],
  }:{
    type: 'sqlite',
    dropSchema: true,
    database: './src/infra/db/sqlite/database.sqlite',
    synchronize: true,
    logging: false,
    entities: [UserTypeOrm],
  }
} 

export const AppDataSource =  new DataSource(dataSourceConfig())