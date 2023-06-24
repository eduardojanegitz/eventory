import Inventory from "../models/Inventory.js"

export const inventory = {
  getAllInventory: async (req, res) => {
    try {
      const getInventory = await Inventory.find();

      res.status(200).json(getInventory);
    } catch (error) {
      console.log("erro na consulta dos inventários", error);
    }
  },

  create: async (req, res) => {
    try {
      const item = {
        location: req.body.location,
        responsable: req.body.responsable,
        item: req.body.item,
      };

      const response = await Inventory.create(item);
      res.status(201).json({ response, msg: "Item inventariado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
};
