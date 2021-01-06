import {Router} from 'express';
import {CreditosController} from '../controllers/creditos.controller'
const router = Router();
const creditos = new CreditosController();

router.route('/creditos')
    .post((req,res) => { 
        creditos.agregarCredito(req,res); 
    });
router.route('/creditos')
    .put((req,res) => { 
        creditos.descontarCredito(req,res); 
    });
router.route('/creditos')
    .get((req,res) => { 
        creditos.consultarMonto(req,res); 
    });
export default router;