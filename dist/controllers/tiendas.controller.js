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
exports.TiendasController = void 0;
const database_1 = require("../database/database");
class TiendasController {
    constructor() {
    }
    getTiendas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.connect();
            const [rows, fields] = yield db.query("select * from tiendas");
            return res.json(rows);
        });
    }
    createTienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.connect();
            const [rows, fields] = yield db.query("insert into tiendas(nombre,estado,fecha_creacion,fecha_modificacion)values('" + req.body.nombre + "',1,SYSDATE(),SYSDATE())");
            const resp = { "status": "OK", "codeResponse": 200, "Message": "Tienda creada con éxito" };
            return res.json(resp);
        });
    }
    updateTienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.connect();
            const [rows, fields] = yield db.query("update tiendas set nombre='" + req.body.nombre + "' where id='" + req.headers.tiendaid + "'");
            const resp = { "status": "OK", "codeResponse": 200, "Message": "Tienda modificada con éxito" };
            return res.json(resp);
        });
    }
    deleteTienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.connect();
            const [rows, fields] = yield db.query("delete from tiendas where id='" + req.headers.tiendaid + "'");
            const resp = { "status": "OK", "codeResponse": 200, "Message": "Tienda eliminada con éxito" };
            return res.json(resp);
        });
    }
}
exports.TiendasController = TiendasController;
