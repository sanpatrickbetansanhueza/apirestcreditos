"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiendas_controller_1 = require("../controllers/tiendas.controller");
const router = express_1.Router();
const tiendas = new tiendas_controller_1.TiendasController();
router.route('/tiendas')
    .get((req, res) => {
    tiendas.getTiendas(req, res);
});
router.route('/tiendas')
    .post((req, res) => {
    tiendas.createTienda(req, res);
});
router.route('/tiendas')
    .put((req, res) => {
    tiendas.updateTienda(req, res);
});
router.route('/tiendas')
    .delete((req, res) => {
    tiendas.deleteTienda(req, res);
});
exports.default = router;
