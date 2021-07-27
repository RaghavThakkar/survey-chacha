import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

import Flight from './flights';
// create a model class
const QuestionSchema = new Schema
  ({
    question: String,
    optionsList: [{
      type: Schema.Types.ObjectId,
      ref: 'Option'
    }],
    type: {
      //1 yes no
      //2 multiple choice,
      //3 simple question and ans

      type: String,
      enum: ['1', '2', '3'],
      default: '2'
    }
  },
    {
      collection: 'questions'
    });

const Model = mongoose.model('Question', QuestionSchema);
export default Model;
