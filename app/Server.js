require('dotenv/config');
const express = require('express');

class Server {
	
	/**
	 * Start the server
	 * 
	 * @return {EventEmitter} The app instance
	 */
	static boot() {
		const app = express();
		app.use(express.json()) 
		app.listen(process.env.PORT, (res) => {
			console.log('Api listening on port 3000...');
		});
		
		return app;
	}
}

module.exports = Server;
