const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: '',
    },
    resetString: {
        type: String,
        default: '',
    },
    createAt: {
        type: Date,
        
    },
    expiresAt: {
        type: Date,
      
    }
});

resetPasswordSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

resetPasswordSchema.set('toJSON', {
    virtuals: true,
});

exports.ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema);
exports.resetPasswordSchema = resetPasswordSchema;
