const bd = require('../database/dbindex');
const { genSalt, hash, compare } = require('bcrypt');
const json = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const {selectUser } = require('../database/querys/queryindex');


const autenticación = (req, res, next) => {
	try {
		expressjwt({
			secret: process.env.JWT_SECRET,
			algorithms: ['HS256'],
		}).unless({
			path: [
				{
					url: '/login',
					methods: ['POST', 'OPTIONS'],
				},
				{
					url: '/usuarios',
					methods: ['POST', 'OPTIONS'],
				},
			],
		})(req, res, next);
	} catch (error) {
		throw new Error(error);
	}
};

const registrarUser = async (req, res, next) => {
	try {
		if (!req.body) {
			res.status(400).send({
				status: 'Bad request',
				msg: 'Request body is required',
			});
		} else {
			const { email, password } = req.body;

			if (!email || !password) {
				res.status(400).send({
					status: 'Bad request',
					msg: 'Email and password are required fields',
				});
			} else {
				const userExist = await db.query(selectUser, [email]);
				if (userExist.rowCount) {
					res.status(400).send({
						status: 'Bad request',
						msg: 'User already exists',
					});
				} else {
					if (password.length < 8 || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
						res.status(400).send({
							status: 'Bad request',
							msg: 'Password must be at least 8 characters long and contain at least 1 special character',
						});
					} else {
						const { password } = req.body;
						genSalt(10, function (err, salt) {
							hash(password, salt, function (err, hash) {
								req.user = {
									...req.body,
									passwordHash: hash,
								};
								next();
							});
						});
					}
				}
			}
		}
	} catch (error) {
		next(error);
	}
};


const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const userExist = await db.query( selectUser, [email]);
		if (!userExist.rowCount) {
			res.status(400).send({
				status: 'Bad request',
				msg: 'User does not exist',
			});
		} else {
			const { id, email, role } = userExist.rows[0];
			const passwordHash = userExist.rows[0].password;

			const match = await compare(password, passwordHash);
			if (match) {
				const token = json.sign(
					{
						id,
						role,
						email,
					},
					process.env.JWT_SECRET,
					{
						expiresIn: '1h',
					}
				);
				req.token = token;
				next();
			} else {
				res.status(401).send('Credenciales incorrectas');
			}
		}
	} catch (error) {
		next(error);
	}
};
const validarform =  (req, res, next)=>{

}
module.exports = {
	autenticación,
	registrarUser,
	loginUser,
};
