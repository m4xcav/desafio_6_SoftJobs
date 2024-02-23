const db = require('../database/dbindex');
const { genSalt, hash, compare } = require('bcrypt');
const json = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const {selectUser } = require('../database/querys/queryindex');


const autenticación = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];
  
	if (!token) {
	  return res.status(401).json({ error: 'No token provided' });
	}
  
	try {
	  const payload = json.verify(token, process.env.JWT_SECRET);
	  req.email = payload.email;
	  next();
	} catch (error) {
	  if (error instanceof json.TokenExpiredError) {
		return res.status(401).send({ error: 'Token ha expirado' });
	  }
  
	  if (error instanceof json.JsonWebTokenError) {
		return res.status(401).send({ error: 'Token o firma no válida' });
	  }
  
	  return res.status(401).send({ error: 'Token no válido' });
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
        const userExist = await db.query(selectUser, [email]);

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

module.exports = {
	autenticación,
	registrarUser,
	loginUser,
};
