import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: String,
  price: Number,
  features: [String],
  duration: Number, // in days
});

export default mongoose.model('Plan', planSchema);
