const expressAPI = require('express');
const author = require('../model/author');
const router = expressAPI.Router();

// include author schema
const authorSchema = require('../model/author');

router.get('/', async(req, res) => {
    let searchAuthors = {};
    if (req.query.authorName != null && req.query.authorName != '') {
        searchAuthors.name = new RegExp(req.query.authorName, "i");
    }
    try {
        const authors = await authorSchema.find(searchAuthors);
        console.log(authors);
        console.log(searchAuthors);
        res.render('author/index', { Authors: authors, searchText: req.query.authorName });
    } catch {
        res.render('/');
    }
});

router.get('/new', (req, res) => {
    res.render('author/new', { author: new authorSchema() });
});

router.post('/', async(req, res) => {
    const author = new authorSchema({
        name: req.body.name
    });
    try {
        const newAuther = await author.save();
        //res.redirect(`author/${newAuthor.id}`);
        res.redirect(`author`);
        console.log(author);
    } catch {
        res.render('author/new', {
            author: author,
            errorMsg: "Cannot create new Author"
        });
    }
});

module.exports = router;