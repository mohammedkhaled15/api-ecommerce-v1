const Order = require("../models/Order");

//CREATE NEW Order
const createNewOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "You haven't authority to create order ", error });
    return;
  }
};

//UPDATE Order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json("You haven't authority to edit Orders");
  }
};

//DELETE Order
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) res.status(404).json("no Order found with this ID");
    res.status(200).json(`the user ${deletedOrder.id} has been deleted`);
  } catch (error) {
    res.status(401).json("You haven't authority to delete Orders data");
  }
};

//GET User Orders
const getOrders = async (req, res) => {
  try {
    const requiredOrders = await Order.find({ userID: req.params.userId });
    if (!requiredOrders) res.status(404).json("no Order found with this ID");
    res.status(200).json(requiredOrders);
  } catch (error) {
    res.status(401).json("You haven't authority to see Orders data");
  }
};

//GET ALL Orders for All Users
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(401).json("You haven't authority to see others users orders");
  }
};

//get stats
const getMonthlyIncome = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: prevMonth },
          ...(productId && { products: { $elemMatch: { productId } } }),
        },
      },
      {
        $project: { month: { $month: "$createdAt" }, sales: "$amount" },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createNewOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getAllOrders,
  getMonthlyIncome,
};
