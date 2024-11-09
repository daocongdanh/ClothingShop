const express = require("express");
const router = express.Router();

const controller = require("../controllers/category.controller");

router.get("/", controller.getAllCategories);
router.post("/", controller.createCategory);

module.exports = router;