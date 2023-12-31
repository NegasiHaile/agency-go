import { Session, SessionStatus, SessionType } from '@/interfaces/sessions.interface';
import { Schema, model } from 'mongoose';

const SessionSchema: Schema<Session> = new Schema({
  url: {
    type: String,
    default: '',
  },
  key: {
    type: String,
    default: '',
  },
  bucket: {
    type: String,
    default: '',
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'Creator',
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(SessionType),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(SessionStatus),
    required: true,
  },
});

export const SessionModel = model<Session>('Session', SessionSchema);
