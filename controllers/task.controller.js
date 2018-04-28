var mongoose = require("mongoose"),
    Task = mongoose.model("Tasks");

exports.list_all_task = (req, res) => {
    Task.find({}, (err, task)=> {
        if (err) res.send(err)
        res.json(task);
    })
}

exports.create_a_task = (req, res) => {
    var new_task = new Task(req.body);
    new_task.save((err, task)=> {
        if (err) res.send(err)
        res.json(task);
    })
}

