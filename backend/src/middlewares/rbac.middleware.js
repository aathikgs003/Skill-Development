import ApiError from '../utils/apiError.js';

// Middleware to check if user has required role(s)
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Unauthorized: User details not found'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Forbidden: Role '${req.user.role}' is not authorized to access this resource`
        )
      );
    }

    next();
  };
};

// Placeholder for permission-based checks if needed
export const authorizePermission = (permission) => {
  return (req, res, next) => {
    // If SuperAdmin, bypass check
    if (req.user && req.user.role === 'SuperAdmin') {
      return next();
    }
    
    // Otherwise check permissions array
    if (!req.user || !req.user.permissions || !req.user.permissions.includes(permission)) {
      return next(new ApiError(403, `Forbidden: Missing permission '${permission}'`));
    }
    next();
  };
};
