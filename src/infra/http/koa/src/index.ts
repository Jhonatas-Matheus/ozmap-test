import 'dotenv/config'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser';
import { Server } from 'http';
import cors from '@koa/cors'
import { AppDataSource } from '../../../db/typeorm/data-source';
import { router } from './routes';

export const koa = new Koa()

const connectionDatabase  = async () =>{
    const connection = await  AppDataSource.initialize()
    return connection
}
koa.use(cors())
koa.use(bodyParser());
koa.use(router.routes())
koa.use(router.allowedMethods());
export let server: Server
const startServer = async ()=>{
    try {
        connectionDatabase()
        server = koa.listen(3000)
    } catch (error) {
        console.log(error)
    }
}
startServer()

