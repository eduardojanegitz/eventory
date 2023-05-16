import Tag from "../models/Tag.js";

export const getTags = async (req, res) => {
    try {
      const tags = await Tag.find();
  
      res.status(200).json(tags[0]);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };