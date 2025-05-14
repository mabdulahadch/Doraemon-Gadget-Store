import express from "express";
import { registerCharacter, getAllCharacters, loginCharacter, searchCharacters } from "../controller/Character.controller.js"; 

const router = express.Router();

router.get("/search", searchCharacters);

router.post("/login", loginCharacter);

router.post("/", registerCharacter);

router.get("/", getAllCharacters);



export default router;