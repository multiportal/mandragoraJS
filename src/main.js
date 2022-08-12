const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
var colors = require('colors');
colors.enable();

app.use(express.static(__dirname + './../build'));
//app.use((req, res, next) => {res.status(404).sendFile(__dirname + '/build/pages/404.html');});

app.listen(PORT, () => {
    console.log(`Server on PORT:${PORT}`.blue);
});