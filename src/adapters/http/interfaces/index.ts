import { statusCode } from "../helpers/status-code"

export interface IHttpResponse{
    statusCode: statusCode
    body: any
}

export interface IHttpRequest{
    body?: any
    id?: string
    params?: object
}