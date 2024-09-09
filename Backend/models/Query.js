const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  message: { type: String, required: true },
  submitted_at: { type: Date, default: Date.now },
});

const Query = mongoose.model('Query', querySchema);
module.exports = Query;
