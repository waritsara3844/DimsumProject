const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/model/db");
const app = express();

global._basedir = __dirname;
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my REST." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/menu.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
