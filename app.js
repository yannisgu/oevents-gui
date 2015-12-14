var express = require('express');
var app = express();
app.use(express.static('public'));
app.use("/api/person", require("./src/api/personApi"))
app.use("/api/results", require("./src/api/resultsApi"))
app.use("/api/peopleSearch", require("./src/api/peopleSearchApi"))



var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
