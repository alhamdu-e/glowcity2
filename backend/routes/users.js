const express = require("express");
const router = express.Router();
const db = require("../database/connection.js");
const jwt = require("jsonwebtoken");

const secreteKey = "my secret key";

router.post("/signup", (req, res) => {
	const { fname, lname, email, password, age, phone, adress } = req.body;
	const sql =
		"insert into users (fname,lname,email,adress,phone,age,password) values (?, ?, ?, ?, ?,?,?)";
	const sql1 = "insert into account (email,password) values (?, ?)";
	db.query(
		sql,
		[fname, lname, email, adress, phone, age, password],
		(err, result) => {
			if (!err) {
				res.send({ status: "User created" });
			} else {
				console.log(err);
				res.status(400);
			}
		}
	);
});
router.post("/login", (req, res) => {
	const { email, password } = req.body;
	const token = jwt.sign({}, secreteKey);
	const sqlUsers = "SELECT * FROM users WHERE email=? AND password=?";
	const sqlProfesional =
		"SELECT * FROM profesional WHERE email=? AND password=?";
	const sqlAdmin = "SELECT * FROM admin WHERE email=? AND password=?";

	db.query(sqlUsers, [email, password], (err, usersResult) => {
		if (err) {
			console.log(err);
			return res.sendStatus(400);
		}
		if (usersResult.length > 0) {
			console.log("user");
			return res.status(200).json({ userType: "user", isAut: token });
		}

		db.query(sqlProfesional, [email, password], (err, profesionalResult) => {
			if (err) {
				console.log(err);
				return res.sendStatus(400);
			}
			if (profesionalResult.length > 0) {
				console.log("profesional");
				return res.status(200).json({ userType: "profesional", isAut: token });
			}

			db.query(sqlAdmin, [email, password], (err, adminResult) => {
				if (err) {
					console.log(err);
					return res.sendStatus(400);
				}
				if (adminResult.length > 0) {
					console.log("admin");
					return res.status(200).json({ userType: "admin", isAut: token });
				}
				const unAuthenicatedUser = false;
				console.log("User not found");
				return res.status(404).json(unAuthenicatedUser);
			});
		});
	});
});
module.exports = router;
