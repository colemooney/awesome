const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/podcasts', (req, res, next) => {
  res.render('podcasts');
});

module.exports = router;
