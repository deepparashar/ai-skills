import { genToken } from '../config/utils.js';
import userModel from '../models/User.js';
import bcrypt from 'bcryptjs'

export const Signup = async (req,res) => {
 const {name, email, password} = req.body;

 try {
    if(!name && !email && !password){
        res.json({success:false, message:'Missing Credentials'})
    }

    const user = await userModel.findOne({email})
    if(user){
        res.json({success:false, message:'User already exists'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await userModel.create({
     name, email, password:hashedPassword
    });

    const token = genToken(newUser._id)

    res.json({success:true, userData:newUser, token, message:'User Created'})

 } catch (error) {
    console.log(error)
    res.json({message:error.message})
 }
}

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }

    const user = await userModel.findOne({ email }); 

    if (!user) {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }

    const token = genToken(user._id);

    res.json({ success: true, token, userData: user, message: 'Login Successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const uploadResume = async (req, res) => {
  try {
    const userId = req.user.id;

    // Cloudinary multer stores file URL in req.file.path or req.file.secure_url
    const fileUrl = req.file.path || req.file.secure_url;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { resumeUrl: fileUrl },
      { new: true }
    );

    res.json({ success: true, message: 'Resume uploaded', resumeUrl: fileUrl, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Resume upload failed' });
  }
};



export const checkAuth = (req,res) => {
  try {
     res.json({success:  true, user: req.user})
  } catch (error) {
     console.log(error)
    res.json({message:error.message})
  }
}