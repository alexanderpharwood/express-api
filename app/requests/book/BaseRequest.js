class BaseRequest {
	constructor(req) {
		this.req = req
	}
	
	/**
	 * Authorise the request
	 * @return {bool}
	 */
	authorise() {
		// Does the user have permission, etc.?
		return true;
	}
}

module.exports = BaseRequest;
