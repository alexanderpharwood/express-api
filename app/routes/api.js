var express = require('express')
var router = express.Router()
const ApiMiddleware = require('../middleware/ApiMiddleware');
const BookController = require('../controllers/BookController');

router.use(function (req, res, next) {
	const global = new ApiMiddleware(req, res, next);
	global.handle();
})

router.get('/books', (req, res) => {
	const controller = new BookController(req, res);
	return controller.index();
});

router.get('/books/:id', (req, res) => {
	const controller = new BookController(req, res);
	return controller.show();
});

router.post('/books', (req, res) => {
	const controller = new BookController(req, res);
	return controller.store();
});

router.put('/books/:id', (req, res) => {
	const controller = new BookController(req, res);
	return controller.update();
});

router.delete('/books/:id', (req, res) => {
	const controller = new BookController(req, res);
	return controller.delete();
});

module.exports = router;
