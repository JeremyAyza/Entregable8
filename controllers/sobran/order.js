const { Order } = require('../../models/index');

// Obtener todas las órdenes
exports.getOrders = async (req, res, next) => {
	console.log('GET ORDERS');
	try {
		const orders = await Order.findAll();
		res.json(orders);
	} catch (error) {
		next(error);
	}
};

// Obtener una orden por su ID
exports.getOrderById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const order = await Order.findByPk(id);
		if (!order) {
			return res.status(404).json({ message: 'Orden no encontrada' });
		}
		res.json(order);
	} catch (error) {
		next(error);
	}
};

// Crear una nueva orden
exports.createOrder = async (req, res, next) => {
	try {
		const { total } = req.body;
		const order = await Order.create({ total });
		res.status(201).json(order);
	} catch (error) {
		next(error);
	}
};

// Actualizar una orden existente
exports.updateOrder = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { total } = req.body;
		const order = await Order.findByPk(id);
		if (!order) {
			return res.status(404).json({ message: 'Orden no encontrada' });
		}
		order.total = total;
		await order.save();
		res.json(order);
	} catch (error) {
		next(error);
	}
};

// Eliminar una orden existente
exports.deleteOrder = async (req, res, next) => {
	try {
		const { id } = req.params;
		const order = await Order.findByPk(id);
		if (!order) {
			return res.status(404).json({ message: 'Orden no encontrada' });
		}
		await order.destroy();
		res.json({ message: 'Orden eliminada' });
	} catch (error) {
		next(error);
	}
};
