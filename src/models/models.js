import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const emailCollection = 'email';
const credentialCollection = 'credential';

const EmailSchema = new mongoose.Schema({
  from: {
    type: String
  },
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
  },
  credential: {
    type: ObjectId,
    ref: credentialCollection,
    required: true,
  },
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
  email: [{
    type: ObjectId,
    ref: emailCollection
  }],
});

export const Email = mongoose.model(emailCollection, EmailSchema);
export const Credential = mongoose.model(credentialCollection, CredentialSchema);