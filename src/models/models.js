import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const emailCollection = 'email';
const credentialCollection = 'credential';

const EmailSchema = new mongoose.Schema({
  to: {
    type: String
  },
  subject: {
    type: String
  },
  text: {
    type: String
  },
  priority: {
    type: Number,
    enum: [1, 2, 3], // High -> Low
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'error'],
  },
  sentAt: {
    type: Date,
  }
}, { timestamps: true });

const CredentialSchema = new mongoose.Schema({
  host: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required: true,
  },
  secure: {
    type: Boolean
  },
  auth: {
    user: {
      type: String,
      required: true,
      unique: true
    },
    pass: {
      type: String,
      required: true
    }
  },
});

// Model.create() or Model.save()
EmailSchema.pre('save', { query: false, document: true }, function (next) {
  const self = this;
  if (!self.status) {
    self.status = 'pending';
  } else {
    self.status = 'sent';
  }
  next();
});

export const Email = mongoose.model(emailCollection, EmailSchema);
export const Credential = mongoose.model(credentialCollection, CredentialSchema);