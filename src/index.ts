import 'source-map-support/register';
import {Server} from './app/server';

const server = new Server();
server.listen();
