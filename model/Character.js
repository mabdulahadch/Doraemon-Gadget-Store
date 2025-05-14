import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);

const CharacterSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    charactername: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["human", "robot"],
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

CharacterSchema.plugin(AutoIncrement, { inc_field: "id", start_seq: 1 });

const Character = mongoose.model("Character", CharacterSchema);
export default Character;
