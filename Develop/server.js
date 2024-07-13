const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public/assets", express.static(__dirname + "/public/assets"));

require("./routes/html_routes")(app);
require("./routes/api_routes")(app);


app.listen(PORT, function() {
    console.log(`App listening at http://localhost:${PORT}`);
});