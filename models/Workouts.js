const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
    type: String,
    name: String,
    duration: Number,
    reps: Number,
    sets: Number,
    duration: Number,
    distance: Number
});

const Workouts = mongoose.model("Workouts", WorkoutsSchema);

module.exports = Workouts;
