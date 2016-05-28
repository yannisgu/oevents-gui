var MongoClient = require('mongodb').MongoClient;

module.exports = function(req, res) {
    var query;

    if(req.query.query) {
        query = JSON.parse(req.query.query);
        if(query.personId) {
            query.personId = require('mongodb').ObjectId(query.personId)
        }
    }

    var fields;
    if(req.query.fields) {
        fields = JSON.parse(req.query.fields);
    }
    console.log(query)
    var url = 'mongodb://oevents-mongo/oevents';
    MongoClient.connect(url, function(err, db) {
        db.collection("results").find(query, fields).toArray(function(err, results) {
            if(err) {
                res.send(err)
                return
            }
            res.send(results)
        })
    })

}
