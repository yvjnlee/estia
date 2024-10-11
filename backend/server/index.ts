import './common/env';
import Server from './common/server';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const port = parseInt(process.env.PORT ?? '3000');
export default new Server().router(routes).listen(port);
