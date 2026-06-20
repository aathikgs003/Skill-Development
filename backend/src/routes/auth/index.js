import express from 'express';
import roleRoutes from './role.routes.js';
import permissionRoutes from './permission.routes.js';
import userRoleRoutes from './userRole.routes.js';
import rolePermissionRoutes from './rolePermission.routes.js';
import userPermissionRoutes from './userPermission.routes.js';
import loginHistoryRoutes from './loginHistory.routes.js';
import auditLogRoutes from './auditLog.routes.js';

const router = express.Router();

router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);
router.use('/userRoles', userRoleRoutes);
router.use('/rolePermissions', rolePermissionRoutes);
router.use('/userPermissions', userPermissionRoutes);
router.use('/loginHistorys', loginHistoryRoutes);
router.use('/auditLogs', auditLogRoutes);

export default router;
