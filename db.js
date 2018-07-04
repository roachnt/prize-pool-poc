var mongoose = require("mongoose");
require("dotenv").load();
mongoose.connect(process.env.DATABASE);
