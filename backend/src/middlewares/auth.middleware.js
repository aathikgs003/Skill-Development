import User from '../models/auth/User.js';
import { verifyAccessToken } from '../utils/jwt.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace('Bearer ', '');

  if (!token) throw new ApiError(401, 'Access token missing');

  const decoded = verifyAccessToken(token);
  const user = await User.findById(decoded.userId).select('-passwordHash');

  if (!user) throw new ApiError(401, 'User not found');
  if (user.status !== 'Active') throw new ApiError(403, 'Account is not active');

  req.user = user;
  next();
});

export default authMiddleware;
