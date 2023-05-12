import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import usersRoutes from "./routes/users.js";
import generalRoutes from "./routes/general.js";
import itemsRoutes from "./routes/items.js";
import tagsRoutes from "./routes/tags.js";

// DATA IMPORTS
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import { dataUser, dataProduct, dataProductStat } from "./data/index.js";
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
app.use("/users", usersRoutes);

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
    // Product.insertMany(dataItem);
    // ProductStat.insertMany(dataItemStat);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} didn't connect`));
