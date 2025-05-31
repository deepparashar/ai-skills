import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
   skills: {
    type: [String], 
    default: [],
  },

  interests: {
    type: [String], 
    default: [],
  },

  goals: {
    type: String, 
    default: '',
  },

  resumeUrl: {
    type: String, 
    default: '',
  },
},
 { timestamps: true });


const userModel = mongoose.model('user', userSchema);

export default userModel;
