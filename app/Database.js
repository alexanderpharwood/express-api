require('dotenv/config');
const mongoose = require('mongoose');

class Database {
	/**
	 * Establish a connection with Mongo
	 *
	 * @return {void}
	 */
	static connect() {
		mongoose.connect(process.env.DB_CONNECTION, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
	}
}

module.exports = Database;
