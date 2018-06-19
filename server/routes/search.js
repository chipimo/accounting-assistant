var express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  const { credentials } = req.body;
 
      res.json({
        result: {
          details: rows,
          // searchIndex: rows.searchIndex,
          // page: rows.page,
        },
      });
});

function error(params) {}

module.exports = router;
