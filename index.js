const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");

app.use(express.json());
app.use(cors());
require("dotenv").config();

connectDb();

app.use(transactionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
