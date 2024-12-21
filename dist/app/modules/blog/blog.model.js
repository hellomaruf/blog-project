"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Object,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: true,
        required: true,
    },
}, {
    timestamps: true,
});
exports.BlogModel = (0, mongoose_1.model)("Blog", BlogSchema);
