import { model, Schema, Document } from 'mongoose';
import { Shifts } from '@interfaces/shifts.interface';

const ShiftSchema: Schema<Shifts> = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'employee',
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'Creator',
  },
  startTime: {
    type: Date,
    default: () => new Date(),
  },
  endTime: {
    type: Date,
    default: () => new Date(),
  },
  startDate: {
    type: Date,
    default: () => new Date(),
  },
  endDate: {
    type: Date,
    default: () => new Date(),
  },
  frequency: {
    type: String,
    default: '',
  },
  repeat: {
    type: {},
    default: {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    },
  },
  status: {
    type: Boolean,
    default: true,
  },
});
export const ShiftModel = model<Shifts & Document>('Shift', ShiftSchema);
