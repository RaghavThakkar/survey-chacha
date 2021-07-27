
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

import Flight from './flights';
// create a model class
const SurveySchema = new Schema
    ({
        questions: [{
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }],
        active: Boolean,
        userId: Number
    },
        {
            collection: 'surveys'
        });

const Model = mongoose.model('Survey', SurveySchema);
export default Model;
