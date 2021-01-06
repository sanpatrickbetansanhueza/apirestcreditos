import {Request, Response} from 'express';
import {connect} from '../database/database';

declare global {
    namespace Express {
        interface Request {
        rut: string;
        nombre: string;
        correo: string;
        }
    }
}

export class ClientesController {

    constructor() {
    }

    async getClientes(req:Request, res:Response): Promise<Response>{
        const db = await connect();
        const [rows, fields]  = await db.query("select * from clientes");
        return res.json(rows);
    }
    async createCliente(req:Request, res:Response): Promise<Response>{
        const db = await connect();
        const [rows, fields]  = await db.query("insert into clientes(rut,nombre,correo,estado,fecha_creacion,fecha_modificacion)values('"+req.body.rut+"','"+req.body.nombre+"','"+req.body.correo+"',1,SYSDATE(),SYSDATE())");
        const resp = {"status":"OK","codeResponse": 200,"Message":"Cliente creado con éxito"};
        return res.json(resp);
    }
    async updateCliente(req:Request, res:Response): Promise<Response>{
        const db = await connect();
        const [rows, fields]  = await db.query("update clientes set rut='"+req.body.rut+"',nombre='"+req.body.rut+"',correo='"+req.body.correo+"' where correo='"+req.headers.correo+"'");
        const resp = {"status":"OK","codeResponse": 200,"Message":"Cliente modificado con éxito"};
        return res.json(resp);
    }
    async deleteCliente(req:Request, res:Response): Promise<Response>{
        const db = await connect();
        const [rows, fields]  = await db.query("delete from clientes where correo='"+req.body.correo+"'");
        const resp = {"status":"OK","codeResponse": 200,"Message":"Cliente eliminado con éxito"};
        return res.json(resp);
    }
}