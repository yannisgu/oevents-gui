var MongoClient = require('mongodb').MongoClient;

module.exports = function(req, res) {

    var url = 'mongodb://oevents-mongo/oevents';
    MongoClient.connect(url, function(err, db) {
        db.collection("people").find({_id: require('mongodb').ObjectId(req.query.id)}).toArray(function(err, results) {
            if(err) {
                res.send(err)
                return
            }
            if(results.length > 0) {
                res.send(results[0])
            }
            else {
                res.send({})
            }
        })
    })

}
