const mongoose = require("mongoose");
const { app } = require("./app");
const path = require("path");
const configPath = path.join(__dirname, "env");
require("dotenv").config({ path: configPath });
//PhHzLrFsBNB0Jy8f

const DB_HOST =
  "mongodb+srv://Zemfira:PhHzLrFsBNB0Jy8f@cluster0.hxnvwh5.mongodb.net/my-contacts?retryWrites=true&w=majority";

const { PORT } = process.env;

mongoose
  .connect(DB_HOST)
  //.connect(process.env.DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
