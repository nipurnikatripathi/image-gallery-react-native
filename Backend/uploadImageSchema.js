var mongoose = require("mongoose");
var uploadImageSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryCollection",
    },
    filename: { type: String },
    path: { type: String },
    mimetype: { type: String },
    originalname: { type: String },
    createdAt: { type: Date, default: Date.now },
    order: { type: String },
  },
  { versionKey: false }
);
module.exports = mongoose.model("uploadImageCollections", uploadImageSchema);
