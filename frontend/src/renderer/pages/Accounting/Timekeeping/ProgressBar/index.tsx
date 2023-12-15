import './style.css';

const ProgressBar = ({ time, shiftStart, shiftEnd, isOnBreak }) => {
  const shiftDuration = shiftEnd - shiftStart;
  const timeWorked = time - shiftStart;
  const progressPercentage = (timeWorked / shiftDuration) * 100;

  // Helper function to determine color of each segment
  const segmentColor = (index, segments) => {
    const segmentTime = shiftDuration / segments;
    if (index < timeWorked / segmentTime) {
      return isOnBreak ? 'red' : 'green';
    } else if (index < time / segmentTime) {
      return 'red';
    }
    return 'grey';
  };

  // Create segments for the progress bar
  const segments = 9; // Change this to increase/decrease the number of segments
  const progressBarSegments = Array.from({ length: segments }, (_, index) => (
    <div
      key={index}
      className={`progress-segment ${segmentColor(index, segments)}`}
    />
  ));

  return (
    <div className="progress-bar">
      {progressBarSegments}
      <div
        className="progress-bar-time"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
