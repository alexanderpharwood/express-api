const pruve = require('pruve');
const BaseRequest = require('./BaseRequest');

class UpdateRequest extends BaseRequest {
	constructor(req) {
		super(req);
	}

	/**
	 * Validate the data
	 * 
	 * @return {Pruve} The Pruve validation object
	 */
	validate() {
		// This is a PUT request, so all properties must be present
		const rules = {
			title: 'string.max:64.min:1',
			slug: 'string.max:64.min:1',
			author: 'string.max:64.min:1',
		};

		const messages = {
			'title.string': "Title must be a text value",
			'title.max': "Title must be less that 64 characters long",
			'title.min': "Title must be at least one character log",
			'slug.string': "Slug must be a text value",
			'slug.max': "Title must be less that 64 characters long",
			'slug.min': "Title must be at least one character log",
			'author.string': "Author must be a text value",
			'author.max': "Author must be less that 64 characters long",
			'author.min': "Author must be at least one character log",
		};
		
		return pruve(this.req.body).passes(rules, messages);
	}
}

module.exports = UpdateRequest;
