const express = require("express");
const app = express();
var colors = require('colors');
const port = 3000;

colors.enable()
app.use(express.static(__dirname +'build'));
//app.get("/", (req, res) => {res.send("Root");});

app.listen(port, () => {
    console.log(`Server on port:${port}`.blue);
});