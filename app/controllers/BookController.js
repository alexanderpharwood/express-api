const BaseController = require('./BaseController');
const Book = require('../models/Book');
const DeleteRequest = require('../requests/book/DeleteRequest');
const mongoose = require('mongoose');
const ShowRequest = require('../requests/book/ShowRequest');
const StoreRequest = require('../requests/book/StoreRequest');
const UpdateRequest = require('../requests/book/UpdateRequest');

class BookController extends BaseController {
	/**
	 * List all resources
	 *
	 * @return {http.ServerResponse}
	 */
	index() {
		Book.find().then(books => {
			return this.res.json({data: books});
		}).catch(error => {
			return this.res.status(500).send({errors: 'Something went wrong'});
		});
	}
	
	/**
	 * Show a resource
	 * 
	 * @return {http.ServerResponse}
	 */
	show() {
		const Validator = new ShowRequest(this.req);
		if (Validator.authorise() === false) {
			// If they don't have access, we will tell them it doesn't exist.
			return this.res.status(404).send({errors: 'Resource not found'});
		}
		
		Book.findById(this.req.params.id).then(book => {
			if (book === null) {
				return this.res.status(404).send({errors: 'Resource not found'});
			}

			return this.res.send({data: book.toJson()});
		}).catch(error => {
			if (error instanceof mongoose.Error.CastError) {
				return this.res.status(404).send({errors: 'Resource not found'});
			}

			return this.res.status(500).send({errors: 'Something went wrong'});
		});
	}
	
	/**
	 * Store a resource
	 * 
	 * @return {http.ServerResponse}
	 */
	store() {
		const Validator = new StoreRequest(this.req);
		if (Validator.authorise() === false) {
			return this.res.status(401).send({errors: 'You are not permitted to perform that action'});
		}
		
		const valid = Validator.validate();
		
		try {
			valid.try();
		} catch (exception) {
			return this.res.status(422).send({errors: exception.errors});
		}
		
		const book = new Book();
		Object.assign(book, valid.value);
		
		book.save().then(() => {
			return this.res.status(201).send({data: book});
		}).catch(error => {
			return this.res.status(500).send({errors: 'Something went wrong saving the resource'});
		});
	}
	
	/**
	 * Update a resource
	 * 
	 * @return {http.ServerResponse}
	 */
	update() {
		Book.findById(this.req.params.id).then(book => {
			if (book === null) {
				return this.res.status(404).send({errors: 'Resource not found'});
			}

			const Validator = new UpdateRequest(this.req);
			if (Validator.authorise() === false) {
				return this.res.status(401).send({errors: 'You are not permitted to perform that action'});
			}

			const valid = Validator.validate();

			try {
				valid.try();
			} catch (exception) {
				return this.res.status(422).send({errors: exception.errors});
			}

			Object.assign(book, valid.value);
			
			book.save().then(() => {
				return this.res.send({data: book.toJson()});
			}).catch(error => {
				return this.res.status(500).send({errors: 'Something went wrong saving the resource'});
			});
		}).catch(error => {			
			if (error instanceof mongoose.Error.CastError) {
				return this.res.status(404).send({errors: 'Resource not found'});
			}
			
			return this.res.status(500).send({errors: 'Something went wrong saving the resource'});
		});
	}
	
	/**
	 * Delete a resource
	 * 
	 * @return {http.ServerResponse}
	 */
	delete() {
		const Validator = new DeleteRequest(this.req);
		if (Validator.authorise() === false) {
			// If they don't have access, we will tell them it doesn't exist.
			return this.res.status(404).send({errors: 'Resource not found'});
		}
		
		Book.findByIdAndRemove(this.req.params.id).then((book) => {
			if (book === null) {
				return this.res.status(404).send({errors: 'Resource not found'});
			}
			
			return this.res.status(204).send();
		}).catch(error => {
			if (error instanceof mongoose.Error.CastError) {
				return this.res.status(404).send({errors: 'Resource not found'});
			}
			
			return this.res.status(500).send({errors: 'Something went wrong deleting the resource'});
		});
	}
}

module.exports = BookController;
