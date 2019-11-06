const Server = require('./app/Server');
const Router = require('./app/Router');
const Database = require('./app/Database');

const app = Server.boot();
Router.register(app);
Database.connect();
