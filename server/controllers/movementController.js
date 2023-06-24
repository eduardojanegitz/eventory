import Movement from "../models/Movement.js";

export const movement = {
  create: async (req, res) => {
    try {
      const movement = {
        name: req.body.name,
        actualLocation: req.body.actualLocation,
        newLocation: req.body.newLocation,
        reason: req.body.reason,
        observations: req.body.observations,
        // responsable: req.body.responsable,
      };

      const response = await Movement.create(movement);
      res.status(201).json({ response, msg: "Movimento registrado com sucesso!" });
    } catch (error) {
      console.log("Erro na inserção da movimentação", error);
    }
  },

  getAll: async (req, res) => {
    try {
      const getMovement = await Movement.find();

      res.status(200).json(getMovement);
    } catch (error) {
      console.log(error);
    }
  },
};
