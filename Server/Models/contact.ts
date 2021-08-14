import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias


// create a model class
const ContactSchema = new Schema
  ({
    fullName: String,
    email: String,
    phone: String,
    message: String
  },
    {
      collection: "contact"
    });

const Model = mongoose.model('Contact', ContactSchema);
export default Model;
