var express = require("express"),
    app = express(),
    cors = require("cors");

app.use(cors({}));

// server bietet diese statischen Dateien unter dem Pfad /lgv-cors an; Pfad ist relativ zu dieser Datei
app.use("/lgv-cors", express.static("../../../"));
app.use(rewrite('/lgv-cors/fonts/*', '/lgv-cors/components/bootstrap/fonts/$1'));
app.use(rewrite('/lgv-cors/css/woffs/*', '/lgv-cors/components/lgv-config/css/woffs/$1'));

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
