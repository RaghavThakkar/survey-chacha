"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SurveyResponseSchema = new Schema({
    questionValue: [String],
    survey: {
        type: Schema.Types.ObjectId,
        ref: 'Survey'
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    collection: 'surveyresponses'
});
const Model = mongoose_1.default.model('SurveyResponse', SurveyResponseSchema);
exports.default = Model;
//# sourceMappingURL=SurveyResponse.js.map