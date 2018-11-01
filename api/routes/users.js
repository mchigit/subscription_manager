const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const AuthModel = require('../models/AuthModel');
const databaseConfig = require("../config.json").database[process.env.NODE_ENV || "development"];
const authModel = new AuthModel(databaseConfig);
const jwtSecret = require("../config.json").secret[process.env.NODE_ENV || "development"];
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res, next) {
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
	bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
		if (err) return res.status(500).json({ success: false, data: err.message });
		const dbData = {
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			hashedPassword: hashedPassword
		}

		authModel.registerUser(dbData, (err, result) => {
			if (err) return res.status(500).json({ success: false, data: err.message });
			return res.json(result.rows);
		});
	})
});

router.post('/login', (req, res, next) => {
	const password = req.body.password;
	const email = req.body.email;
	authModel.getUser(email, (err, result) => {
		if (err) {
			return res.status(500).json({ success: false, data: err.message });
		} else {
			if (result.rows.length === 0) {
				return res.status(400).json({ success: false, data: "Could not find user" });
			} else {
				let user = result.rows[0];

				bcrypt.compare(password, user.password, (err, result) => {
					if (result) {
						const payload = {
							email: user.email,
							firstName: user.first_name,
							lastName: user.last_name,
						}
						const token = jwt.sign(payload, jwtSecret, {
							expiresIn: "24h"
						});

						return res.status(200).json({
							success: true, data: token
						});
					} else {
						// failed authentication
						return res.status(401).json({
							success: false,
							data: "Failed to authenticate user"
						});
					}
				});
			}
		}
	})

});

module.exports = router;
