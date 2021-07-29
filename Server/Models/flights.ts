import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

// create a model class
const FlightSchema = new Schema
  ({
    Airline: String,
    AirlingNumber: String,
    From: String,
    To: String,
    Price: Number,
    Seat: Number,
    FromTime: String,
    ToTime: String,
    Logo: String
  },
    {
      collection: "flights"
    });

const Model = mongoose.model('Flight', FlightSchema);
export default Model;
