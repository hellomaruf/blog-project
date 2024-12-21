"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class QueryBuilder {
    constructor(modelQuery, query) {
        (this.modelQuery = modelQuery), (this.query = query);
    }
    // Method for search------------>
    search(searchableField) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        console.log(search);
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableField.map((field) => ({
                    [field]: { $regex: search, $options: "i" },
                })),
            });
        }
        return this;
    }
    // Method for filtering------------->
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludingImportant = ["search", "sortBy", "sortOrder"];
        excludingImportant.forEach((key) => delete queryObj[key]);
        if (queryObj.filter) {
            queryObj._id = new mongoose_1.Types.ObjectId(queryObj.filter);
            delete queryObj.filter;
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    // Method for sort----------------->
    sort() {
        var _a, _b;
        const sortBy = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || "-createdAt";
        const sortOrder = ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortOrder) === "desc" ? -1 : 1;
        console.log(`Sorting by: ${sortBy}, Order: ${sortOrder}`);
        this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
        return this;
    }
}
exports.default = QueryBuilder;
