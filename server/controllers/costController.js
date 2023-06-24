import Cost from "../models/Cost.js";

export const cost = {
  getAllCost: async (req, res) => {
    try {
      const getCost = await Cost.find();

      res.status(200).json(getCost);
    } catch (error) {
      console.log(error);
    }
  },
  create: async (req, res) => {
    try {
        const postCost = {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description
        }
        const response = await Cost.create(postCost);
        res.status(201).json({response, msg: "Centro de custo criado com sucesso!"})
    } catch (error) {
        console.log(error)
    }
  }
};
