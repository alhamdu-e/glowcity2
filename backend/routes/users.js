const express = require("express");
const router = express.Router();
const db = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const sendEmail = require("../sendEmail.js");

const crypto = require("crypto");

const secreteKey = "my secret key";

const executeQuery = (sql, params = [], res) => {
	db.query(sql, params, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).json({ message: "Database Erroe" });
		} else {
			console.log(result);
			res.status(200).json(result);
			// res.status(400);
		}
	});
};

router.post("/signup", (req, res) => {
	const { fname, lname, email, password, age, phone, adress } = req.body;

	const callback = function (error, data, response) {
		if (error) {
			console.error(error);
		} else {
			console.log("hello");
		}
	};
	const content = `<div style="background-color:#0a1b0b;width:500px;margin:auto;text-align:center; border-radius:12px; padding:20px">
		<h2 style="font-size: 24px;color:#f2f2f2"> Welcome ${fname}</h2>
		<p style="color:#f2f2f2"">You Have Successfully Registered ✔✔✔</p>
	</div>`;

	sendEmail(email, callback, content);

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
			return res
				.status(200)
				.json({ userType: "user", isAut: token, usersResult: usersResult });
		}

		db.query(sqlProfesional, [email, password], (err, profesionalResult) => {
			if (err) {
				console.log(err);
				return res.sendStatus(400);
			}
			if (profesionalResult.length > 0) {
				console.log("profesional");
				return res.status(200).json({
					userType: "profesional",
					isAut: token,
					profesionalResult: profesionalResult,
				});
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

// router.get("/user/:id", (req, res) => {
// 	let id = req.params.id;
// 	const sql = "select * FROM users WHERE id =?";
// 	executeQuery(sql, [id], res);
// 	// db.query(sql, [id], (err, result) => {
// 	// 	if (err) {
// 	// 		console.log(err);
// 	// 		return;
// 	// 	} else {
// 	// 		res.status(200).json(result);
// 	// 	}
// 	// });
// });
router.get("/profesionalAppointed/:id", (req, res) => {
	let id = req.params.id;

	const sql =
		"SELECT appointments.*, service.servicename, users.fname AS userFname,users.lname AS userLname FROM appointments INNER JOIN users ON appointments.customerId = users.id  INNER JOIN service ON appointments.serviceId = service.id where appointments.professionalId = ? ";
	executeQuery(sql, [id], res);
});

router.get("/profesionalData/:id", (req, res) => {
	let id = req.params.id;

	const sql = "select * FROM profesional where id =?";
	executeQuery(sql, [id], res);
});

router.get("/profesional/available", (req, res) => {
	const sql = "select * FROM profesional";
	executeQuery(sql, [], res);
});
router.post("/appointment", (req, res) => {
	console.log("hi");
	const {
		selectedProfessionalId,
		userId,
		date,
		startTime,
		endTime,
		serviceId,
	} = req.body;
	console.log(serviceId);
	const sql =
		"insert into appointments (customerId,professionalId,appointmentDate,startTime,endTime,serviceId) values (?,?,?,?,?,?)";
	const param = [
		userId,
		selectedProfessionalId,
		date,
		startTime,
		endTime,
		serviceId,
	];
	executeQuery(sql, param, res);
});

router.get("/resetemail", (req, res) => {
	const sql = "SELECT * FROM users where email =? ";
	const sql1 = "SELECT * FROM profesional where email =? ";
	const email = req.query.email;
	const expirationTime = new Date();
	expirationTime.setHours(expirationTime.getHours() + 1);

	const callback = function (error, data, response) {
		if (error) {
			console.log(error);
			res.status(500);
			return;
		} else {
			res.status(200);
		}
	};
	const content = `<div style="background-color:#0a1b0b;width:500px;margin:auto;text-align:center; border-radius:12px; padding:20px">
		<h2 style="font-size: 24px;color:#f2f2f2"> Click The Link to reset the password</h2>
		<a href="http://localhost:3000/resetpassword/${btoa(
			expirationTime.getTime()
		)}" target="_blank" style="background-color:#ad3700;padding:12px;text-decoration:none;border-radius:12px;color:#f2f2f2"> Reset Password </a>
		<p style="color:#f2f2f2;margin-top:20px;"> The Link will expire after 1 hour<p/>
	</div>`;

	db.query(sql, [email], (err, result) => {
		if (err) {
			console.log(err);
		}
		if (result.length > 0) {
			res.status(200).json({ email: email });

			sendEmail(email, callback, content);
		} else {
			db.query(sql1, [email], (err, result) => {
				if (err) {
					console.log(err);
				}
				if (result.length > 0) {
					res.status(200).json({ email: email });
					sendEmail(email, callback, content);
				} else {
					res.status(404).json({ userNotFound: true });
				}
			});
		}
	});
});

router.post("/resetPassword", (req, res) => {
	const { password, userEmail } = req.body;
	const sqlRetriveUserData = "select * from users where email  = ?";
	const sqlUpdateUserpassword = `UPDATE users SET password= ? where email=?`;
	const sqlRetriveProfesionalData =
		"select * from profesional where email  = ?";
	const sqlUpdateProfesionalpassword = `UPDATE profesional SET password= ? where email=?`;

	db.query(sqlRetriveUserData, [userEmail], (err, result) => {
		if (err) {
			res.status(500).json({ passwordUpdate: false });
			return;
		}

		if (result.length > 0) {
			db.query(sqlUpdateUserpassword, [password, userEmail], (err, result) => {
				if (err) {
					console.log(err);
					res.status(500).json({ passwordUpdate: false });
					return;
				}
				if (result.affectedRows > 0) {
					console.log("good");
					res.status(200).json({ passwordUpdate: true });
					return;
				}
			});
		} else {
			db.query(sqlRetriveProfesionalData, [userEmail], (err, result) => {
				if (err) {
					res.status(500).json({ passwordUpdate: false });
					return;
				}
				if (result.length > 0) {
					db.query(
						sqlUpdateProfesionalpassword,
						[password, userEmail],
						(err, result) => {
							if (err) {
								res.status(500).json({ passwordUpdate: false });
								return;
							}
							if (result.affectedRows > 0) {
								res.status(200).json({ passwordUpdate: true });
							}
						}
					);
				} else {
					res.status(404).json({ passwordUpdate: false });
				}
			});
		}
	});
});

module.exports = router;
