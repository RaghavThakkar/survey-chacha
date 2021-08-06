import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

// create a model class
const SurveyResponseSchema = new Schema
    ({
        questionValue: [String],
        survey: {
            type: Schema.Types.ObjectId,
            ref: 'Survey'
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
        {
            collection: 'surveyresponses'
        });

const Model = mongoose.model('SurveyResponse', SurveyResponseSchema);
export default Model;
