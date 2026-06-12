const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del menu es obligatorio'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'La descripcion es obligatoria']
    },
    category: {
      type: String,
      required: [true, 'La categoria es obligatoria'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: 0
    },
    available: {
      type: Boolean,
      default: true
    },
    imageUrl: {
      type: String,
      trim: true
    },
    tags: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Menu', menuSchema);