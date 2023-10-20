const mongoose = require("mongoose");
const { connect } = require("mongoose");
const { app } = require("./app");
const path = require("path");
const configPath = path.join(__dirname, ".env");
require("dotenv").config({ path: configPath });

const { PORT, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
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
