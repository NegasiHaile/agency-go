import React from 'react';
import { ProgressBarProps, TimeLine } from '../Types/index.types';

// ProgressBar Component
const ProgressBar: React.FC<ProgressBarProps> = ({
  timeline,
  shiftDuration,
}) => {
  let progressedWidth = 0;
  return (
    <>
      <div style={{ width: '100%' }}>
        {timeline.map((t: TimeLine, i) => {
          if (t.endTime != null) {
            const widthDiff =
              new Date(t.endTime).valueOf() - new Date(t.startTime).valueOf();
            const width = (widthDiff / 1000 / shiftDuration) * 100;
            progressedWidth += width;
            return (
              <div
                key={i}
                style={{
                  width: `${width}%`,
                  borderTop: 'dashed',
                  float: 'left',
                  borderColor: t.type == 'break' ? 'red' : 'green',
                }}
              ></div>
            );
          } else {
            const widthDiff: number =
              new Date().valueOf() - new Date(t.startTime).valueOf();
            const width = (widthDiff / 1000 / shiftDuration) * 100;
            progressedWidth += width;
            return (
              <div
                key={i}
                style={{
                  width: `${width}%`,
                  borderTop: 'dashed',
                  float: 'left',
                  borderColor: t.type == 'break' ? 'red' : 'green',
                }}
              ></div>
            );
          }
        })}
      </div>

      <div
        style={{
          width: `${100 - progressedWidth}%`,
          borderTop: 'dashed',
          float: 'left',
          borderColor: 'gray',
        }}
      ></div>
    </>
  );
};

export default ProgressBar;
