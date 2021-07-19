"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TicketSchema = new Schema({
    FirstName: String,
    LastName: String,
    Gender: String,
    Email: String,
    PhoneNumber: String,
    DOB: String,
    Flight: [{ type: Schema.Types.ObjectId, ref: 'Flight' }]
}, {
    collection: "tickets"
});
const Model = mongoose_1.default.model('Ticket', TicketSchema);
exports.default = Model;
//# sourceMappingURL=tickets.js.map