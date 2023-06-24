import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import itemsRoutes from "./routes/items.js";
import tagsRoutes from "./routes/tags.js";

// DATA IMPORTS
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
// import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import Tag from "./models/Tag.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataTag
} from "./data/index.js";
import router from "./routes/router.js";
/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/general", generalRoutes);
app.use("/items", itemsRoutes);
app.use("/tags", tagsRoutes);
app.use("/client", clientRoutes);

app.use("/api", router);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`));

    /*ONLY ADD DATA ONE TIME */
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // User.insertMany(dataUser);
    // Tag.insertMany(dataTag)

    // Product.insertOne([{
    //   _id: "63701d24f03239c72c00018f",
    //   name: "teste",
    //   price: 311.71,
    //   description: "Revision of Nonaut Sub in Mouth/Throat, Via Opening",
    //   category: "clothing",
    //   rating: 1.15,
    //   supply: 1320,
    // }])
  })
  .catch((error) => console.log(`${error} didn't connect`));
