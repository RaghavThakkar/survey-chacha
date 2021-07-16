const db = require("../models");
const Passengers = db.Passengers;

// Create and Save a new Passenger
exports.create = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

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
  const passenger = new Passengers({
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
    res.setHeader('Access-Control-Allow-Origin', '*');

    const firstname = req.query.firstname;
  var condition = firstname ? { firstname: { $regex: new RegExp(firstname), $options: "i" } } : {};

//   Passengers.findAll(condition)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving passengers."
//       });
//     });

};

// Find a single Passenger with an id
exports.findOne = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const id = req.params.id;

    Passengers.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Passenger with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Passenger with id=" + id });
      });
  
};

// Update a Passenger by the id in the request
exports.update = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Passengers.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Passenger with id=${id}. Maybe Passenger was not found!`
            });
          } else res.send({ message: "Passenger was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Passenger with id=" + id
          });
        });
};

// Delete a Passenger with the specified id in the request
exports.delete = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const id = req.params.id;

    Passengers.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Passenger with id=${id}. Maybe Passenger was not found!`
          });
        } else {
          res.send({
            message: "Passenger was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Passenger with id=" + id
        });
      });
};

// Delete all Passengers from the database.
exports.deleteAll = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    Passengers.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Passengers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all passengers."
      });
    });
};
