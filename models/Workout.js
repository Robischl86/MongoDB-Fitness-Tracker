const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now
        }
    },
    {
    type: String,
    name: String,
    duration: Number,
    reps: Number,
    sets: Number,
    duration: Number,
    distance: Number
});

const Workout = mongoose.model("Workout", WorkoutsSchema);

module.exports = Workout;
