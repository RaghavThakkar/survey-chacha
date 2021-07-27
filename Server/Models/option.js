"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const OptionSchema = new Schema({
    option: String,
}, {
    collection: 'options'
});
const Model = mongoose_1.default.model('Option', OptionSchema);
exports.default = Model;
//# sourceMappingURL=Option.js.map