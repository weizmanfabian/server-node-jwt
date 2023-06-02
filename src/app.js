import express from 'express';
import config from './config.js'
import defaultRoutes from './modulos/default/defaultRoutes.js'
import morgan from 'morgan'

const app = express();

//middleware
app.use(morgan('dev')) //para ver por terminar las diferentes peticiones que se realizan y su status
app.use(express.json()) //para recibir datos en el body en formato json

//configuración
app.set('port', config.app.port)

//rutas
app.use('/api', defaultRoutes);

export default app