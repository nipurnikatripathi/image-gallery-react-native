var mongoose = require("mongoose");
var categorySchema = mongoose.Schema(
  {
    category: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);
module.exports = mongoose.model("categoryCollection", categorySchema);
