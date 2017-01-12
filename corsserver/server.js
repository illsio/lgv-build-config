var express = require("express"),
    app = express(),
    cors = require("cors");

app.use(cors({}));

// server bietet diese statischen Dateien unter dem Pfad /lgv-cors an; Pfad ist relativ zu dieser Datei
app.use("/lgv-cors", express.static("../../../"));

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
