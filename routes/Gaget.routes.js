import express from "express";
import {
  addGadgets,
  getAllGadgets,
  getSingleGadget,
  getGadgetBySpecifiedCharacter,
  updateGadgetById,
  deleteGadgetById,
  getGadgetCount,
  getRecentGadgets,
  transferGadgetOwnership
} from "../controller/Gadget.controller.js";
import { authenticate, onlyRobots } from "../middleware/Authentication.js";

const router = express.Router();

router.get("/count", authenticate,  getGadgetCount);

router.get("/recent", authenticate, getRecentGadgets);

router.post("/", authenticate, onlyRobots, addGadgets);

router.get("/", authenticate, getAllGadgets);

router.get("/:id", authenticate, getSingleGadget);

router.get("/character-gadgets/:id", authenticate, getGadgetBySpecifiedCharacter);

router.patch("/:id/transferTo/:newOwnerId", authenticate, transferGadgetOwnership);

router.patch("/:id", authenticate, onlyRobots, updateGadgetById);

router.delete("/:id", authenticate, onlyRobots, deleteGadgetById);



export default router;
