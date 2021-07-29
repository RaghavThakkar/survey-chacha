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
            //1 yes no
            //2 multiple choice,
            //3 simple question and ans

            type: Number,
            default: 0
        }
    },
        {
            collection: 'surveyresponses'
        });

const Model = mongoose.model('SurveyResponse', SurveyResponseSchema);
export default Model;
