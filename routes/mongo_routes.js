var dbInstance = require("./create-mongo-client");

var mongo_routes = function (mongoClient, url, app) {

    app.route("/mongoClient")
        .get((req, res) => {
            console.log(req.query);
            res.send("Mongo Client has been hit");
        })
        .post((req, res) => {
            res.send("MongoClient Post has been hit")
        });

    app.route("/getData")
        .get((req, res) => {
            console.log("API hit");
            res.send({res: [{name: "NameOne"}, {name: "NameTwo"}, {name: "NameThree"}]});
            // res.send({res: [{"name":"Anmol"}, {"name": "Kohli"}]});
            /*let params = req.query.list;
            let projection = { _id: 0 };
            if (params) {
                if (params instanceof String) projection[params] = 1;
                else {
                    params.forEach(element => {
                        projection[element] = 1;
                    })
                }
            }
            dbInstance(mongoClient, url, "test")
                .then((db, error) => {
                    db.collection("checkInserts").find().project(projection)
                    .toArray()
                    .then(result => {
                        res.send({ res: result });
                    });
                })
                .catch(error => {
                    res.send({ res: "Unable to connect" })
                })*/
            // mongoClient.connect(url, (error, client) => {
            //     if (error) res.send({ res: "Error Connecting MongoDB" });
            //     const db = client.db("test");
            //     db.collection("checkInserts").find().project(projection).toArray()
            //         .then(result => {
            //             console.log(result);
            //             res.send({ res: result });
            //         });
            // })
            // res.send({ res: "GetData GET has been hit" });
            // if (req.query) {

            // } else {

            // }
        })
        .post((req, res) => {
            mongoClient.connect(url, (error, client) => {
                if (error) res.send({ res: "Error Connecting MongoDB" });
                const db = client.db("test");
                if (req.body) {
                    db.collection('checkInserts').insertOne({ a: 5 })
                        .then(result => {
                            let responseObj = {};
                            responseObj.status = true;
                            responseObj.res = result;
                            res.send(responseObj)
                        })
                } else {
                    let responseObj = {};
                    responseObj.status = false;
                    responseObj.res = "Data field cannot be empty";
                    res.send(responseObj)
                }
            })
        })

    app.route("/insertMany")
        .post((req, res) => {
            console.log(req.query);
            mongoClient.connect(url, (error, client) => {
                if (error) res.send({ res: "Error Connecting MongoDB" });
                const db = client.db("test");
                if (req.body) {
                    db.collection("checkInserts").insertMany(req.body)
                        .then(result => {
                            let responseObj = {};
                            responseObj.status = true;
                            responseObj.res = result;
                            res.send(responseObj)
                        })
                } else {
                    let responseObj = {};
                    responseObj.status = false;
                    responseObj.res = "Data field cannot be empty";
                    res.send(responseObj)
                }
            })
        })

    app.route("/checkExist")
        .get((req, res) => {
            let queryParams = req.query.list;
            if (queryParams) {

                mongoClient.connect(url, (error, client) => {
                    const db = client.db("test");
                    if (error) res.send({ res: "unable to connect to database" });
                    db.collection("inventory").find({
                        item: { $exists: false }
                    }).toArray().then((result) => {
                        res.send({ res: result });
                    })
                })
            } else {
                res.send({ res: "No values to check" })
            }
        })
}

module.exports = mongo_routes;