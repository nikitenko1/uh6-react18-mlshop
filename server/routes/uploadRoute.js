const express = require("express");
const upload = require("../middlewares/multerUpload");
const { uploadFile, uploadMultiFile } = require("../controllers/uploadCtrl");

const route = express.Router();

// POST
// /api/upload
// upload 1 file
route.post("/", upload.single("file"), uploadFile);

// POST
// /api/upload/multi4
// upload many files
route.post("/multi", upload.array("multi", 10), uploadMultiFile);

module.exports = route;
