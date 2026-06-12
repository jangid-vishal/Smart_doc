import mongoose from 'mongoose';

const diseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ['Mild', 'Moderate', 'Severe', 'Critical'],
      default: 'Mild',
    },
    symptoms: [
      {
        type: String,
      }
    ],
    causes: [
      {
        type: String,
      }
    ],
    prevention: [
      {
        type: String,
      }
    ],
    treatments: [
      {
        type: String,
      }
    ],
    image: {
      type: String,
    },
    overview: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Disease = mongoose.model('Disease', diseaseSchema);

export default Disease;
