import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

// create a model class
const OptionSchema = new Schema
    ({
        option: String,


    },
        {
            collection: 'options'
        });

const Model = mongoose.model('Option', OptionSchema);
export default Model;
