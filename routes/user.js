const express = require("express");
const router = express.Router();
const { verifyToken, verifyUser } = require("../middleware/auth");
const UserController = require("../controllers/userController");

router.get("/vendors", verifyToken, verifyUser, UserController.getAllVendors);
router.post("/cart/add", verifyToken, verifyUser, UserController.addToCart);
router.get("/cart", verifyToken, verifyUser, UserController.getCart);
router.post("/cart/payment", verifyToken, verifyUser, UserController.processPayment);
router.post("/cart/cancel", verifyToken, verifyUser, UserController.cancelCart);

router.get("/guest", verifyToken, verifyUser, UserController.getGuests);
router.post("/guest/add", verifyToken, verifyUser, UserController.addGuest);
router.put("/guest/update/:id", verifyToken, verifyUser, UserController.updateGuest);
router.delete("/guest/delete/:id", verifyToken, verifyUser, UserController.deleteGuest);

router.get("/order-status", verifyToken, verifyUser, UserController.getOrderStatus);

module.exports = router;
