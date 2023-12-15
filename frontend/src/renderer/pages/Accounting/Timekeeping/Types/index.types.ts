import { Moment } from 'moment';

export interface TimeLine {
  startTime: Date;
  type: 'working' | 'break';
  endTime: Date | null;
}
export interface ProgressBarProps {
  timeline: TimeLine[];
  shiftDuration: number;
}
export interface $props {
  toggleRefresh: () => void;
  shiftDuration: number;
}
export interface CreateData {
  startDateTime: Moment;
  endDateTime: Moment;
  notes: string;
  attendanceData: any;
}
export interface $trackprops {
  refresh: any;
  shiftDuration: number;
}
export interface AttendanceTrackData {
  startDateTime: Date;
  endDateTime: Date;
  breakTime: string[];
  notes: string;
  totalHours: number;
  breakHours: number;
  timeLine: TimeLine[];
}

export interface AttendanceTimeSheet {
  startDateTime: Date;
  endDateTime: Date;
  totalHours: number;
  timeLine: TimeLine[];
  timeline: TimeLine[];
  notes: string;
}

export interface TimeSheetEdit {
  showEdit: boolean;
  handleClose: () => void;
  editData: any;
  getData: () => void;
}
