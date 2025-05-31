// controllers/recommendationController.js
import Recommendation from '../models/recommendation.js';
import userModel from '../models/User.js';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (!user.skills || !user.interests || !user.goals) {
      return res.status(400).json({ success: false, message: 'Profile is incomplete' });
    }

    const prompt = `You're a career advisor AI...

- Skills: ${user.skills.join(', ')}
- Interests: ${user.interests.join(', ')}
- Career Goals: ${user.goals}

Suggest:
- 3 Career paths
- 3 Top companies
- 3 Courses (with platform)
- 3 Skills to learn next

Respond in bullet points.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const responseText = completion.choices[0].message.content;

    // Save to MongoDB
    const newRecommendation = new Recommendation({
      user: userId,
      skills: user.skills,
      interests: user.interests,
      goals: user.goals,
      recommendations: responseText,
    });

    await newRecommendation.save();

    res.json({ success: true, recommendations: responseText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to get recommendations' });
  }
};
