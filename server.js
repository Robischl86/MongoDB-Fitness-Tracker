const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");


const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const db = require("./models")
// const databaseUrl = "workouts";
// const collections = ["exercise"];

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
    useNewUrlParser: true,
    useFindAndModify: false
});

mongoose.set('useUnifiedTopology', true);

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.json(err);
    });
});

app.post("/api/workouts", (req,res) => {
  
    db.Workout.create({
      day: new Date().setDate(new Date().getDate())
  }).then(dbUpdate => {
        res.json(dbUpdate);
      })
      .catch(err => {
        res.json(err);
      });
  });

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.put("/api/workouts/:id", (req,res) => {

    let route = req.params;
    let data = req.body;
      db.Workout.updateOne( {_id: route.id }, {$push: {exercises:  [
        {
        "type" : data.type,
        "name" : data.name,
        "duration" : data.duration,
        "distance" : data.distance,
        "weight" : data.weight,
        "reps" : data.reps,
        "sets" : data.sets
        }
      ] 
    }}).then(dbUpdate => {
      res.json(dbUpdate);
    })
    .catch(err => {
      res.json(err);
    });
    
    });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

