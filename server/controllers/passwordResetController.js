import crypto from 'crypto';
import User from '../models/User.js';

// Since we don't have nodemailer configured yet, we will just simulate email sending
// by returning the reset token in the response (FOR DEMONSTRATION PURPOSES ONLY).
// In production, NEVER return the token in the response, send it via email.

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404);
      throw new Error('There is no user with that email');
    }

    // Get reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

    await user.save({ validateBeforeSave: false });

    const clientBase =
      process.env.CLIENT_URL?.split(',')[0]?.trim() || 'http://localhost:5173';
    const resetUrl = `${clientBase}/reset-password/${resetToken}`;

    // Here you would normally use nodemailer to send the resetUrl to user.email
    console.log(`Password reset link: ${resetUrl}`);

    res.status(200).json({
      success: true,
      message: 'Password reset link sent to email (check console for demo purposes)',
      demoUrl: resetUrl // Only for demo without email setup
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      res.status(400);
      throw new Error('Invalid or expired token');
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    next(error);
  }
};
