require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5000;
const routesUrls = require('./routes/adminroutes/routes')


app.use(cors());
app.use(express.json());
app.use("/api", routesUrls);

mongoose
  .connect(process.env.DATABASE_ACCESS)
  .then(() => console.log("database connected"));

app.listen(PORT, () => {
  console.log(`sever is running ${PORT}`);
});
