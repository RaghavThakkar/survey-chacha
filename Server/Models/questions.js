"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const QuestionSchema = new Schema({
    question: String,
    optionsList: [{
            type: Schema.Types.ObjectId,
            ref: 'Option'
        }],
    type: {
        type: String,
        enum: ['1', '2', '3'],
        default: '2'
    }
}, {
    collection: 'questions'
});
const Model = mongoose_1.default.model('Question', QuestionSchema);
exports.default = Model;
//# sourceMappingURL=questions.js.map