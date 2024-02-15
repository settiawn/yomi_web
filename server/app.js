require("dotenv").config();
const express = require("express");
const cors = require('cors')
const { errorHandler } = require("./middlewares/errorhandler");
const router = require("./routes");
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(router)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app