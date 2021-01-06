"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditosController = void 0;
const database_1 = require("../database/database");
class CreditosController {
    constructor() {
    }
    agregarCredito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.connect();
            const [rows1, fields1_] = yield db.query("select id from clientes where correo='" + req.body.correo + "'");
            let tempResult = rows1;
            let clienteID = tempResult[0].id;
            const [rows2, fields2_] = yield db.query("select * from creditos where cliente_id=" + clienteID);
            let tempResult2 = rows2;
            var resp = {};
            if (tempResult2.length > 0) {
                const [rows3, fields3] = yield db.query("update creditos set monto=(monto+" + parseInt(req.body.monto) + ") where cliente_id=" + clienteID);
            }
            else {
                const [rows4, fields4] = yield db.query("insert into creditos(tienda_id,cliente_id,monto,fecha_creacion,fecha_modificacion)values(" + req.body.tiendaid + "," + clienteID + "," + req.body.monto + ",SYSDATE(),SYSDATE())");
            }
            resp = { "status": "OK", "codeResponse": 200, "Message": "Crédito agregado con éxito" };
            return res.json(resp);
        });
    }
    descontarCredito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.connect();
            const [rows1, fields1_] = yield db.query("select id from clientes where correo='" + req.body.correo + "'");
            let tempResult = rows1;
            let clienteID = tempResult[0].id;
            const [rows2, fields2_] = yield db.query("select * from creditos where cliente_id=" + clienteID);
            let tempResult2 = rows2;
            var resp = {};
            if (tempResult2.length > 0) {
                const [rows3, fields3] = yield db.query("update creditos set monto=(monto-" + parseInt(req.body.monto) + ") where cliente_id=" + clienteID);
            }
            else {
                const [rows4, fields4] = yield db.query("insert into creditos(tienda_id,cliente_id,monto,fecha_creacion,fecha_modificacion)values(" + req.body.tiendaid + "," + clienteID + "," + req.body.monto + ",SYSDATE(),SYSDATE())");
            }
            resp = { "status": "OK", "codeResponse": 200, "Message": "Crédito descontado con éxito" };
            return res.json(resp);
        });
    }
    consultarMonto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.connect();
            const [rows1, fields1_] = yield db.query("select id from clientes where correo='" + req.headers.correo + "'");
            let tempResult = rows1;
            let clienteID = tempResult[0].id;
            const [rows, fields] = yield db.query("select * from creditos where tienda_id=" + req.headers.tiendaid + " and cliente_id='" + clienteID + "'");
            let tempResult2 = rows;
            console.log(tempResult2[0].monto);
            const resp = { "status": "OK", "codeResponse": 200, "Monto crédito disponible": tempResult2[0].monto };
            return res.json(resp);
        });
    }
}
exports.CreditosController = CreditosController;
