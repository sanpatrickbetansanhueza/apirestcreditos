"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const creditos_controller_1 = require("../controllers/creditos.controller");
const router = express_1.Router();
const creditos = new creditos_controller_1.CreditosController();
router.route('/creditos')
    .post((req, res) => {
    creditos.agregarCredito(req, res);
});
router.route('/creditos')
    .put((req, res) => {
    creditos.descontarCredito(req, res);
});
router.route('/creditos')
    .get((req, res) => {
    creditos.consultarMonto(req, res);
});
exports.default = router;
