
var mongoose = require("mongoose")
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {
        type: String,
        required: "Kindly Enter Name"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [
            {
                type: String,
                enum: ["pending", "ongoing", "completed"]
            }
        ],
        default: ["pending"]
    }
})

module.exports = mongoose.model('Tasks', TaskSchema);