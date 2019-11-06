const api = require('./routes/api');

class Router {
	/**
	 * Register routes
	 * 
	 * @param  {EventEmitter} app The app instance
	 * @return {void}
	 */
	static register(app) {
		app.use('/api/v1', api);
	}
}

module.exports = Router;
