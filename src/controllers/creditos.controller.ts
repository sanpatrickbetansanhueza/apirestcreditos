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

export class CreditosController {

    constructor() {
    }

    async agregarCredito(req:Request, res:Response): Promise<Response>{
        const db = await connect();
        const [rows1, fields1_]  = await db.query("select id from clientes where correo='"+req.body.correo+"'");
        let tempResult: any = rows1;
        let clienteID = tempResult[0].id;
        const [rows2, fields2_]  = await db.query("select * from creditos where cliente_id="+clienteID);
        let tempResult2: any = rows2;

        var resp={};
        if(tempResult2.length>0){
            const [rows3, fields3]  = await db.query("update creditos set monto=(monto+"+parseInt(req.body.monto)+") where cliente_id="+clienteID);
        }
        else{
            const [rows4, fields4]  = await db.query("insert into creditos(tienda_id,cliente_id,monto,fecha_creacion,fecha_modificacion)values("+req.body.tiendaid+","+clienteID+","+req.body.monto+",SYSDATE(),SYSDATE())");
        }
        resp = {"status":"OK","codeResponse": 200,"Message":"Crédito agregado con éxito"};
        return res.json(resp);
    }
    async descontarCredito(req:Request, res:Response): Promise<Response>{
        const db = await connect();
        const [rows1, fields1_]  = await db.query("select id from clientes where correo='"+req.body.correo+"'");
        let tempResult: any = rows1;
        let clienteID = tempResult[0].id;
        const [rows2, fields2_]  = await db.query("select * from creditos where cliente_id="+clienteID);
        let tempResult2: any = rows2;

        var resp={};
        if(tempResult2.length>0){
            const [rows3, fields3]  = await db.query("update creditos set monto=(monto-"+parseInt(req.body.monto)+") where cliente_id="+clienteID);
        }
        else{
            const [rows4, fields4]  = await db.query("insert into creditos(tienda_id,cliente_id,monto,fecha_creacion,fecha_modificacion)values("+req.body.tiendaid+","+clienteID+","+req.body.monto+",SYSDATE(),SYSDATE())");
        }
        resp = {"status":"OK","codeResponse": 200,"Message":"Crédito descontado con éxito"};
        return res.json(resp);
    }
    async consultarMonto(req:Request, res:Response): Promise<Response>{
        const db = await connect();
        const [rows1, fields1_]  = await db.query("select id from clientes where correo='"+req.headers.correo+"'");
        let tempResult: any = rows1;
        let clienteID = tempResult[0].id;
        const [rows, fields]  = await db.query("select * from creditos where tienda_id="+req.headers.tiendaid+" and cliente_id='"+clienteID+"'");
        let tempResult2: any = rows;
        console.log(tempResult2[0].monto);
        const resp = {"status":"OK","codeResponse": 200,"Monto crédito disponible":tempResult2[0].monto};
        return res.json(resp);
    }
}