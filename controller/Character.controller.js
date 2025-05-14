import Character from "../model/Character.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerCharacter = async (req, res) => {
  const { charactername, role, password } = req.body;
  try {
    if (!charactername || !role || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide character name, role, and password",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 4);

    const character = await Character.create({
      charactername,
      role,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      data: {
        id: character.id,
        charactername: character.charactername,
        role: character.role,
      },
    });
  } catch (error) {
    console.error("Error registering character:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find().select("-password");
    res.status(200).json({
      success: true,
      data: characters,
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginCharacter = async (req, res) => {
  const { charactername, password } = req.body;
  try {
    const character = await Character.findOne({ charactername });

    if (!character || !(await bcrypt.compare(password, character.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: character._id, role: character.role },
      "doraemon",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchCharacters = async (req, res) => {
  try {
    const { name, role } = req.query;

    const filter = {};
    if (name) filter.charactername = { $regex: new RegExp(name, "i") };
    if (role) filter.role = role;

    const characters = await Character.find(filter).select("-password");
    res.status(200).json({ message: "Searched Character Found", results: characters });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
