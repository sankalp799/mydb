const expressAPI = require('express');
const router = expressAPI.Router();

// include author schema
const authorSchema = require('../model/author');

router.get('/', (req, res) => {
    res.render('author/index');
});

router.get('/new', (req, res) => {
    res.render('author/new', { author: new authorSchema() });
});

router.post('/', (req, res) => {
    res.render('Create');
});

module.exports = router;