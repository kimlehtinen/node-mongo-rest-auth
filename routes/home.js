const express = require('express');
const auth = require('../middleware/authentication');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(
    {
      message: 'Welcome to node-mongo-rest-auth!',
    },
  );
});

/**
 * This endpoint requires authentication.
 * Endpoints can be protected just by adding the const "auth"
 * just like in the example below.
 */
router.get('/admin', auth, (req, res) => {
  res.json(
    {
      message: 'This can only be seen if authentication is successful.',
    },
  );
});

module.exports = router;
