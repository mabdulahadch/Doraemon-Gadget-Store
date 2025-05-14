import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';
const AutoIncrement1 = mongooseSequence(mongoose);


const GadgetSchema = new mongoose.Schema({
    index: {
    type: Number
  },
  name: {
    type: String,
    required: [true, 'Gadget name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Gadget description is required'],
    trim: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
    required: [true, 'Character ID is required']
  }
}, {
  timestamps: true
});

GadgetSchema.plugin(AutoIncrement1, {inc_field: 'index', start_seq: 1});


const Gadget = mongoose.model("Gadget", GadgetSchema);
export default Gadget;