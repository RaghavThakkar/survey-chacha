import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

import Flight from '../Models/flights';
// create a model class
const TicketSchema = new Schema
  ({
    FirstName: String,
    LastName: String,
    Gender: String,
    Email: String,
    PhoneNumber: String,
    DOB: String,
    Flight: [{ type: Schema.Types.ObjectId, ref: 'Flight' }]
  },
    {
      collection: "tickets"
    });

const Model = mongoose.model('Ticket', TicketSchema);
export default Model;
