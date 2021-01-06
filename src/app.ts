import express, {Application} from 'express'; 
import morgan from 'morgan';
import clientesRoutes from './routes/clientes.routes';
import tiendasRoutes from './routes/tiendas.routes';
import creditosRoutes from './routes/creditos.routes';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerDocument from './swagger.json';

export class App{

    private app:Application;

    constructor(private port?: number | string){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes(){
        this.app.use(clientesRoutes);
        this.app.use(tiendasRoutes);
        this.app.use(creditosRoutes);
        this.app.use('/swagger',swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    }

    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log("Server on: http://localhost:"+this.app.get('port'));
    }
}