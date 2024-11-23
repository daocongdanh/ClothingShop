const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const FileController = require("../controllers/file.controller");
const ResponseError = require("../responses/success.response");
const upload = require("../middlewares/fileUpload");
const requireRoles = require("../middlewares/authJwt");
const { UserRole } = require("../constants/index");

router.post("/",
  requireRoles([UserRole.USER, UserRole.ADMIN]),
  (req, res, next) => {
    upload.array('files', 5)(req, res, (err) => {
      if(err){
        return res.status(400).json(new ResponseError(400, err.message));
      }
      next();
    })
  }, asyncHandler(FileController.createFile));
router.get("/:fileName", asyncHandler(FileController.viewFile));

module.exports = router;