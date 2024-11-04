// backend/models/User.js
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    metadata: {
      created: { type: Date, default: Date.now },
      lastLogin: Date
    }
  });
  
  module.exports = mongoose.model('User', userSchema);