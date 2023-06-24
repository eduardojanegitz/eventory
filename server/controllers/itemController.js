import Item from "../models/Item.js";

export const postItem = {
  create: async (req, res) => {
    try {
      const item = {
        name: req.body.name,
        description: req.body.description,
        value: req.body.value,
        location: req.body.location,
        itemGroup: req.body.itemGroup,
        supplier: req.body.supplier,
        serialNumber: req.body.serialNumber,
        tag: req.body.tag,
      };

      const response = await Item.create(item);
      res.status(201).json({ response, msg: "Item criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const getItem = await Item.find();

      res.status(200).json(getItem);
    } catch (error) {
      console.log(error);
    }
  },
  getOne: async (req, res) => {
    try {
      const tag = req.params.tag;
      const getItemByTag = await Item.findOne({ tag });

      res.status(200).json(getItemByTag);
    } catch (error) {
      console.log("Erro em encontrar o item", error);
    }
  },
  countDoc: async (req, res) => {
    try {
      const count = await Item.count();

      res.status(200).json(count);
    } catch (error) {
      console.log(error);
    }
  },
  countValue: async (req, res) => {
    // const value = {"value"}
    try {
      const countVal = await Item.aggregate([
        {
          $group: {
            _id: {id: "_id"},
            total: { $sum: "$value"}
          }
        }
      ]);


      res.status(200).json(countVal);
    } catch (error) {
      console.log(error);
    }
  },
};
