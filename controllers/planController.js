import Plan from '../models/Plan.js';

export const getPlans = async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
};

export const createPlan = async (req, res) => {
  const { name, price, features, duration } = req.body;

  if (!name || !price || !features || !duration) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newPlan = new Plan({
    name,
    price,
    features,
    duration,
  });

  try {
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating plan', error });
  }
}