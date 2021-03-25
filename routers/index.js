const expressAPI = require('express');
const router = expressAPI.Router();

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;