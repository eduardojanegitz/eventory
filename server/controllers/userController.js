import User from "../models/User.js";

export const users = {
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const getUserById = await User.findById(id);

      res.status(200).json(getUserById);
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const getUser = await User.find();

      res.status(200).json(getUser);
    } catch (error) {
      console.log("Erro na requisição do usuário", error);
    }
  },
  create: async (req, res) => {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        department: req.body.department,
      };

      const response = await User.create(user);
      res.status(201).json({ response, msg: "Usuário criado com sucesso!" });
    } catch (error) {
      console.log("deu erro", error);
    }
  },
};
