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
exports.ClientesController = void 0;
const database_1 = require("../database/database");
class ClientesController {
    constructor() {
    }
    getClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.connect();
            const [rows, fields] = yield db.query("select * from clientes");
            return res.json(rows);
        });
    }
    createCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.connect();
            const [rows, fields] = yield db.query("insert into clientes(rut,nombre,correo,estado,fecha_creacion,fecha_modificacion)values('" + req.body.rut + "','" + req.body.nombre + "','" + req.body.correo + "',1,SYSDATE(),SYSDATE())");
            const resp = { "status": "OK", "codeResponse": 200, "Message": "Cliente creado con éxito" };
            return res.json(resp);
        });
    }
    updateCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.connect();
            const [rows, fields] = yield db.query("update clientes set rut='" + req.body.rut + "',nombre='" + req.body.rut + "',correo='" + req.body.correo + "' where correo='" + req.headers.correo + "'");
            const resp = { "status": "OK", "codeResponse": 200, "Message": "Cliente modificado con éxito" };
            return res.json(resp);
        });
    }
    deleteCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.connect();
            const [rows, fields] = yield db.query("delete from clientes where correo='" + req.body.correo + "'");
            const resp = { "status": "OK", "codeResponse": 200, "Message": "Cliente eliminado con éxito" };
            return res.json(resp);
        });
    }
}
exports.ClientesController = ClientesController;
