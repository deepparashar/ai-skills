import express from 'express';
import { getRecommendations } from '../controller/recommendationController.js';
import { authenticateJWT } from '../middleware/authenticatemiddleware.js';

const recommendationRouter = express.Router();

recommendationRouter.get('/api/ai/recommendation', authenticateJWT, getRecommendations);

export default recommendationRouter;
