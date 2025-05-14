import Gadget from "../model/Gadget.js";
import Character from "../model/Character.js";

export const addGadgets = async (req, res) => {
  try {
    const { name, description, addedBy } = req.body;
    const gadget = new Gadget({ name, description, addedBy });
    await gadget.save();
    res.status(201).json(gadget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllGadgets = async (req, res) => {
  try {
    const { name } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') };
    }

    const gadgets = await Gadget.find(query);
    res.status(200).json(gadgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGadgetBySpecifiedCharacter = async (req, res) => {
  try {

    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({
        success: false,
        message: "Character not found",
      });
    }

    if (character.role === "human") {
      return res.status(400).json({
        success: false,
        message: "Humans don't own gadgets",
      });
    }

    const gadgets = await Gadget.find({ addedBy: req.params.id }).populate(
      "addedBy",
      "charactername role"
    );

    res.status(200).json({gadgets});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getSingleGadget = async (req, res) => {
  try {
    const gadget = await Gadget.findById(req.params.id);
    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }
    res.status(200).json(gadget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGadgetById = async (req, res) => {
  try {
    const gadget = await Gadget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }
    res.status(200).json(gadget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGadgetById = async (req, res) => {
  try {
    const gadget = await Gadget.findByIdAndDelete(req.params.id);
    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }
    res.status(200).json({ message: "Gadget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getGadgetCount = async (req, res) => {
  try {
    const count = await Gadget.countDocuments();
    res.status(200).json({ totalGadgets: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getRecentGadgets = async (req, res) => {
  try {
    const recentGadgets = await Gadget.find().sort({ createdAt: -1 }).limit(5).populate("addedBy", "charactername role");
    res.status(200).json(recentGadgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const transferGadgetOwnership = async (req, res) => {
  try {
    const { id, newOwnerId } = req.params;

    const newOwner = await Character.findById(newOwnerId);
    if (!newOwner || newOwner.role !== 'robot') {
      return res.status(400).json({ message: "New owner must be a valid robot character" });
    }

    const gadget = await Gadget.findById(id);
    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    gadget.addedBy = newOwnerId;
    await gadget.save();

    res.status(200).json({ message: "Gadget ownership transferred", gadget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
