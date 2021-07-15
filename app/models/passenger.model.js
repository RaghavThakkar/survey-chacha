module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstname: String,
        middlename: String,
        surname: String,
        phone: String,
        email: String,
        date: String,
        gender: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Passenger = mongoose.model("passenger", schema);
    return Passenger;
  };
  