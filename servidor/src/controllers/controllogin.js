
const login = (req, res, next) => {
	try {
		const { token } = req;
		res.status(200).send({
			status: 'Success',
			msg: 'Login successfully',
			token,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
    login,
};