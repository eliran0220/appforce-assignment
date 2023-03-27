import express  from 'express';
import departments from './routers/departments.js';
import users from './routers/users.js';
import  {initDbTables} from './db.js';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { getConnection } from './db.js';
dotenv.config();
class App {
    constructor() {
        this.app = express()
        this.app.use(bodyParser.json());
    }

    async startServer() {
        this.app.use('/api',departments);
        this.app.use('/api',users);
        this.app.listen(3000);
        await getConnection();
        await initDbTables()
    }
}

const _app = new App();
export default _app;