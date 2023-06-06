import 'dotenv/config'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser';
import { Server } from 'http';
import cors from '@koa/cors'
import { AppDataSource } from '../../../db/typeorm/data-source';
import { router } from './routes';
import path from 'path';
import yamljs from 'yamljs';
import { koaSwagger } from 'koa2-swagger-ui';

export const koa = new Koa()

const connectionDatabase  = async () =>{
    const connection = await  AppDataSource.initialize()
    return connection
}
koa.use(cors())
koa.use(bodyParser());
koa.use(router.routes())
koa.use(router.allowedMethods());
const filePath = path.join(__dirname, 'openapi.yaml');
const spec = yamljs.load(filePath);
router.get('/docs', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));
export let server: Server
const startServer = async ()=>{
    try {
        connectionDatabase()
        server = koa.listen(process.env.PORT? process.env.PORT : 3000,()=>{
            console.log(`Aplicação rodando na porta ${process.env.PORT? process.env.PORT : 3000}`)
        })
    } catch (error) {
        console.log(error)
    }
}
startServer()

