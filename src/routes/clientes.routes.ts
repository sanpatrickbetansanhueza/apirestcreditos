import {Router} from 'express';
import {ClientesController} from '../controllers/clientes.controller'
const router = Router();
const clientes = new ClientesController();

router.route('/clientes')
    .get((req,res) => { 
        clientes.getClientes(req,res); 
    });
router.route('/clientes')
    .post((req,res) => { 
        clientes.createCliente(req,res); 
    });
router.route('/clientes')
    .put((req,res) => { 
        clientes.updateCliente(req,res); 
    });
router.route('/clientes')
    .delete((req,res) => { 
        clientes.deleteCliente(req,res); 
    });

export default router;