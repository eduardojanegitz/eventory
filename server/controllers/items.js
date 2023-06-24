import NewItem from "../models/NewItem.js";
import OverallStat from "../models/OverallStat.js";

export const getItems = async (req, res) => {
  try {
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getNewItems = async (req, res) => {
  try {
    const newItem = await NewItem.find();

    res.status(400).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
