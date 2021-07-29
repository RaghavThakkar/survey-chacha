"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const FlightSchema = new Schema({
    Airline: String,
    AirlingNumber: String,
    From: String,
    To: String,
    Price: Number,
    Seat: Number,
    FromTime: String,
    ToTime: String,
    Logo: String
}, {
    collection: "flights"
});
const Model = mongoose_1.default.model('Flight', FlightSchema);
exports.default = Model;
//# sourceMappingURL=flights.js.map