
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias


// create a model class
const SurveySchema = new Schema
    ({
        questions: [{
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }],
        active: Boolean,

        isPublic: {
            type: Boolean,
            default: true
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
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
        }, type: {
            //1 yes no
            //2 multiple choice,
            //3 simple question and ans

            type: String,
            enum: ['1', '2', '3'],
            default: '2'
        }
    },
        {
            collection: 'surveys'
        });

const Model = mongoose.model('Survey', SurveySchema);
export default Model;
