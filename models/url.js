const { Timestamp } = require("bson");
const mongoose = require("mongoose");
const { type } = require("os");

const urlSchema = new mongoose.Schema({
    ShortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            Timestamp: {
                type: Number,  
                required: true
            }
        }
    ]
}, { timestamps: true });
const URL = mongoose.model("url",urlSchema);

module.exports = URL;