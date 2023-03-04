const { User } = require('../../models');

exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

exports.getUserById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ message: `User with ID ${id} not found` });
		}
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

exports.createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = await User.create({ name, email, password });
		res.status(201).json(user);
	} catch (error) {
		console.log(error);
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, email, password } = req.body;
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ message: `User with ID ${id} not found` });
		}
		await user.update({ name, email, password });
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ message: `User with ID ${id} not found` });
		}
		await user.destroy();
		res.status(204).end();
	} catch (error) {
		next(error);
	}
};


