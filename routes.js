'use strict';

var express = require("express");
var router = express.Router();
var Book = require("./models").Book;

router.param("ID", function(req, res, next, id){
	Book.findById(id, function(err, doc){
		if (err) return next(err);
		if (!doc) {
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.book = doc;
		return next();
	});
});

router.param("aID", function(req, res, next, id){
	req.book1 = req.book.id(id);
	if (!req.book1) {
		err = new Error("Not Found");
		err.status = 404;
		return next(err);
	}
	next();
});

//GET /books
//Route for books collection
router.get("/", function(req, res, next){
	//returns all the books present
	Book.find({}, {link: false}, null, function(err, Books){
		if (err) return next(err);
		res.json(Books);
	});
});


router.get("/download", function(req, res, next){
	//returns all the books present with link
	Book.find({}, null, null, function(err, Books){
		if (err) return next(err);
		res.json(Books);
	});
});
//POST /books
//Route for creating books
router.post("/", function(req, res, next){
	//add books to the database
	var book = new Book(req.body);
	book.save(function(err, book){
		if (err) return next(err);
		res.status(201);
		res.json(book);
	})
});

//GET /questions/:id
//Route for specific books
router.get("/:department/:level/books", function(req, res){
	//returns books with the particular department and level without link to pdf
	Book.find({department: req.params.department, level: req.params.level}, {link: false}, null, function(err, Books){
		if (err) return next(err);
		res.json(Books);
	});
});

router.get("/:department/:level/download/books", function(req, res){
	//returns all books with the particular department and level with link to pdf
	Book.find({department: req.params.department, level: req.params.level}, null, null, function(err, Books){
		if (err) return next(err);
		res.json(Books);
	});
});

//GET /questions/:id
//Route for specific textbooks
router.get("/:department/:level/textbook", function(req, res){
	//returns textbooks with the particular department and level without link to pdf
	Book.find({department: req.params.department, level: req.params.level, type: "textbook"}, {link: false}, null, function(err, Books){
		if (err) return next(err);
		res.json(Books);
	});
});


router.get("/:department/:level/download/textbook", function(req, res){
	//returns all textbooks with the particular department and level with link to pdf
	Book.find({department: req.params.department, level: req.params.level, type: "textbook"}, null, null, function(err, Books){
		if (err) return next(err);
		res.json(Books);
	});
});


router.get("/:department/:level/pdf", function(req, res){
	//returns pdfs with the particular department and level without link to pdf
	Book.find({department: req.params.department, level: req.params.level, type: "pdf"}, {link: false}, null, function(err, Books){
		if (err) return next(err);
		res.json(Books);
	});
});

router.get("/:department/:level/download/pdf", function(req, res){
	//returns all pdfs with the particular department and level with link to pdf
	Book.find({department: req.params.department, level: req.params.level, type: "pdf"}, null, null, function(err, Books){
		if (err) return next(err);
		res.json(Books);
	});
});

router.get("/:ID", function(req, res, next){
	//returns one pdf or textbook with the particular department and level with link to pdf
	//note a request for one pdf or textbook will definetely be the one to be downloades so it will return the link also.
	res.json(req.book);
});

//PUT /questions/:id/answers/:id
//Edit a specific answer
router.put("/:ID", function(req, res){
	//updates book with the particular id
	req.book1.update(req.body, function(err, result){
		if (err) return next(err);
		res.json(result);
	});
});

//DELETE /questions/:qid/answers/:aid
//Delete a specific answer
router.delete("/:id", function(req, res){
	//deletes a particular book from the database
});

router.delete("/:department/:level", function(req, res){
	//deletes all books with the particular department from the database
});

router.delete("/", function(req, res){
	//deletes all books from the database
});

module.exports = router;