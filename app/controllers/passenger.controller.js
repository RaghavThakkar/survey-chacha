const db = require("../models");
const Passenger = db.Passengers;

// Create and Save a new Passenger
exports.create = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  // Validate request
  if (!req.body.firstname) {
    res.status(400).send({ message: "Firstname can not be empty!" });
    return;
  }
  if (!req.body.lastname) {
    res.status(400).send({ message: "Lastaname can not be empty!" });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({ message: "Email can not be empty!" });
    return;
  }
  if (!req.body.phone) {
    res.status(400).send({ message: "Phone can not be empty!" });
    return;
  }
  if (!req.body.date) {
    res.status(400).send({ message: "Date can not be empty!" });
    return;
  }

  // Create a Passenger
  const passenger = new Passenger({
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    surname: req.body.surname,
    phone: req.body.phone,
    email: req.body.email,
    date: req.body.date,
    gender: req.body.gender,
  });

  // Save Passenger in the database
  passenger
    .save(passenger)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Passenger.",
      });
    });
};

// Retrieve all Passengers from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Passengers from the database.
exports.deleteAll = (req, res) => {};

// Find all published Passengers
exports.findAllPublished = (req, res) => {};
