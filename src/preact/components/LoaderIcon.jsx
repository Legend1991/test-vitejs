import React from 'react';

export default function LoaderIcon({ className }) {
  return (
    <svg
      className={className}
      version="1.1"
      id="L3"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
    >
      <circle
        fill="none"
        stroke="#000"
        strokeWidth="2"
        cx="12"
        cy="12"
        r="8"
        style={{ opacity: 1 }}
      />
      <circle
        fill="#f9d72f"
        stroke="#f9d72f"
        strokeWidth="2"
        cx="4"
        cy="12"
        r="2"
      >
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
