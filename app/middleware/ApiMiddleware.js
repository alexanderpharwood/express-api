const BaseMiddleware = require('./BaseMiddleware');

class ApiMiddleware extends BaseMiddleware{
	/**
	 * Handle the middleware
	 * 
	 * @return {void}
	 */
	handle() {
		// res.json() should take care of this, but let's set it just in case.
		this.res.type('application/json');
		this.next();
	}
}

module.exports = ApiMiddleware;
