import React from 'react';

function GrowthSvg() {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.39999 17H18.59C20.49 17 21.49 16 21.49 14.1V2H3.48999V14.1C3.49999 16 4.49999 17 6.39999 17Z"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 2H22.5"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g opacity="0.4">
        <path
          d="M8.5 22L12.5 20M12.5 20V17M12.5 20L16.5 22"
          stroke="white"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        opacity="0.4"
        d="M8 11L11.15 8.37C11.4 8.16 11.73 8.22 11.9 8.5L13.1 10.5C13.27 10.78 13.6 10.83 13.85 10.63L17 8"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default GrowthSvg;
