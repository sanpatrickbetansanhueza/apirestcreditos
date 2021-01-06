import {Request, Response} from 'express';
import {connect} from '../database/database';

declare global {
    namespace Express {
      interface Request {
        nombre: string;
        tiendaid:number;
      }
    }
}

export class TiendasController {

    constructor() {
    }

    async getTiendas(req:Request, res:Response): Promise<Response>{
        const db = await connect();
        const [rows, fields]  = await db.query("select * from tiendas");
        return res.json(rows);
    }
    async createTienda(req:Request, res:Response): Promise<Response>{
        const db = await connect();
        const [rows, fields]  = await db.query("insert into tiendas(nombre,estado,fecha_creacion,fecha_modificacion)values('"+req.body.nombre+"',1,SYSDATE(),SYSDATE())");
        const resp = {"status":"OK","codeResponse": 200,"Message":"Tienda creada con éxito"};
        return res.json(resp);
    }
    async updateTienda(req:Request, res:Response): Promise<Response>{
        const db = await connect();
        const [rows, fields]  = await db.query("update tiendas set nombre='"+req.body.nombre+"' where id='"+req.headers.tiendaid+"'");
        const resp = {"status":"OK","codeResponse": 200,"Message":"Tienda modificada con éxito"};
        return res.json(resp);
    }
    async deleteTienda(req:Request, res:Response): Promise<Response>{
        const db = await connect();
        const [rows, fields]  = await db.query("delete from tiendas where id='"+req.headers.tiendaid+"'");
        const resp = {"status":"OK","codeResponse": 200,"Message":"Tienda eliminada con éxito"};
        return res.json(resp);
    }
}