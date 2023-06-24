import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllInventory = {
  getAll: async (req, res) => {
    try {
      const getInventory = await Transaction.find();

      res.status(200).json(getInventory);
    } catch (error) {
      console.log("erro na consulta dos inventários", error);
    }
  },

  // export const getTransactions = async (req, res) => {
  // try {
  //   const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

  //   const generatSort = () => {
  //     const sortParsed = JSON.parse(sort);
  //     const sortFormatted = {
  //       [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
  //     };

  //     return sortFormatted;
  //   };
  //   const sortFormatted = Boolean(sort) ? generatSort() : {};

  //   const transactions = await Transaction.find({
  //     $or: [
  //       { cost: { $regex: new RegExp(search, "i") } },
  //       { userId: { $regex: new RegExp(search, "i") } },
  //     ],
  //   })
  //     .sort(sortFormatted)
  //     .skip(page * pageSize)
  //     .limit(pageSize);

  //   const total = await Transaction.countDocuments({
  //     name: { $regex: search, $options: "i" },
  //   });

  //   res.status(200).json({
  //     transactions,
  //     total,
  //   });
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};

export const postInventoriedItem = {
  create: async (req, res) => {
    try {
      const item = {
        location: req.body.location,
        responsable: req.body.responsable,
        item: req.body.item,
      };

      const response = await Transaction.create(item);
      res.status(201).json({ response, msg: "Item inventariado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
};
