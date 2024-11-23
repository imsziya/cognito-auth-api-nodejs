// src/routes/authRoutes.js
const express = require('express');
const { handleSignUp, handleSignIn, handleGetUser,listUser, handleListUser, handleDeleteUser } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);

router.get('/getuser/:username', authenticate, handleGetUser);
router.get('/getallusers', authenticate,handleListUser);
router.delete('/admin/deleteuser/:username', authenticate, handleDeleteUser)
module.exports = router;