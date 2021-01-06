import {Router} from 'express';
import {TiendasController} from '../controllers/tiendas.controller'
const router = Router();
const tiendas = new TiendasController();

router.route('/tiendas')
    .get((req,res) => { 
        tiendas.getTiendas(req,res); 
    });
router.route('/tiendas')
    .post((req,res) => { 
        tiendas.createTienda(req,res); 
    });
router.route('/tiendas')
    .put((req,res) => { 
        tiendas.updateTienda(req,res); 
    });
router.route('/tiendas')
    .delete((req,res) => { 
        tiendas.deleteTienda(req,res); 
    });
    

export default router;