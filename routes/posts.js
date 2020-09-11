const express = require('express');
const router  = express.Router();

/* GET posts page. */
router.get('/posts', (req, res, next) => {
  res.render('post-page');
});

module.exports = router;
