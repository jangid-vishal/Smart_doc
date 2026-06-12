import Disease from '../models/Disease.js';

// @desc    Get all diseases (search and filter)
// @route   GET /api/diseases
// @access  Public
export const getDiseases = async (req, res, next) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const diseases = await Disease.find({ ...keyword, ...category }).sort({ name: 1 });
    res.json(diseases);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single disease
// @route   GET /api/diseases/:id
// @access  Public
export const getDiseaseById = async (req, res, next) => {
  try {
    const disease = await Disease.findById(req.params.id);

    if (disease) {
      res.json(disease);
    } else {
      res.status(404);
      throw new Error('Disease not found');
    }
  } catch (error) {
    next(error);
  }
};
