
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

        userId: {
            type: Number,
            default: 0
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date,
            default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000)
        },
        title: {
            type: String,
            default: ''
        },

        description: {
            type: String,
            default: ''
        }
    },
        {
            collection: 'surveys'
        });

const Model = mongoose.model('Survey', SurveySchema);
export default Model;
