"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_controller_1 = require("../controllers/clientes.controller");
const router = express_1.Router();
const clientes = new clientes_controller_1.ClientesController();
router.route('/clientes')
    .get((req, res) => {
    clientes.getClientes(req, res);
});
router.route('/clientes')
    .post((req, res) => {
    clientes.createCliente(req, res);
});
router.route('/clientes')
    .put((req, res) => {
    clientes.updateCliente(req, res);
});
router.route('/clientes')
    .delete((req, res) => {
    clientes.deleteCliente(req, res);
});
exports.default = router;
