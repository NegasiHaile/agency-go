import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

const SecondsInput = () => {
  const [seconds, setSeconds] = useState(0);
  const [formattedTime, setFormattedTime] = useState('00:00:00');
  const [editedTime, setEditedTime] = useState('00:00:00');

  useEffect(() => {
    // Convert formatted time to seconds when the formattedTime state changes
    const [hours, minutes, secs] = formattedTime.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + secs;

    setSeconds(totalSeconds);
  }, [formattedTime]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Validate if the input is in the 'hr:min:sec' format
    const isValidInput = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(
      inputValue
    );

    if (isValidInput) {
      // Update formattedTime state if the input is valid
      setFormattedTime(inputValue);
      setEditedTime(inputValue);
    }
  };

  return (
    <TextField
      label="Time (hr:min:sec)"
      variant="outlined"
      value={editedTime}
      onChange={handleInputChange}
    />
  );
};

export default SecondsInput;
