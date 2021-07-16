module.exports = app => {
    const passengers = require("../controllers/passenger.controller.js");
  
    var router = require("express").Router();
  
    // Create a new passenger
    router.post("/", passengers.create);
  
    // Retrieve all passengers
    router.get("/", passengers.findAll);
  
    // Retrieve a single passenger with id
    router.get("/:id", passengers.findOne);
  
    // Update a passenger with id
    router.put("/:id", passengers.update);
  
    // Delete a passenger with id
    router.delete("/:id", passengers.delete);
  
    // Create a new passenger
    router.delete("/", passengers.deleteAll);
  
    app.use('/api/passengers', router);
  };