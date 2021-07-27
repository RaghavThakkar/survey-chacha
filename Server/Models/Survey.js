"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SurveySchema = new Schema({
    questions: [{
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }],
    active: Boolean,
    userId: Number
}, {
    collection: 'surveys'
});
const Model = mongoose_1.default.model('Survey', SurveySchema);
exports.default = Model;
//# sourceMappingURL=Survey.js.map