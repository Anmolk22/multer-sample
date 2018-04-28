var controllers = require("../controllers/task.controller");

var taskRoutes = function (app, upload) {

    app.route("/user/:user")
        .get((req, res)=> {
            console.log(req.params.user);
            res.send("RESPONSE");
        })

    app.route("/tasks")
        .get(controllers.list_all_task)
        .post(controllers.create_a_task);



    app.post('/api/photo', function (req, res, next) {
        console.log("API hit");
        console.log(req.body);
        var path = '';
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
                console.log(err);
                return res.status(422).send("an Error occured")
            }
            // No error occured.
            path = req.file.path;
            return res.send("Upload Completed for " + path);
        });
    });
}

module.exports = taskRoutes;