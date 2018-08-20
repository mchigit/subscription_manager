var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
const AuthModel = require('../models/AuthModel');

const fs = require('fs');
const databaseConfig = JSON.parse(fs.readFileSync('./api/config.json')).database.development;
const authModel = new AuthModel(databaseConfig);

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }, {
    id: 3,
  	username: "Mchi"
  }]);
});

router.post('/register', (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const dbData = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    hashedPassword: hashedPassword
  }
  authModel.registerUser(dbData, (err, result) => {
    if (err) return res.status(500).json({success: false, data: err.message})
    return res.json(result.rows);
  });

});

module.exports = router;
