// src/components/ToggleSwitch.js
import React from 'react';
import './ToggleSwitch.css';

export default function ToggleSwitch({ isOn, handleToggle }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={isOn} onChange={handleToggle} />
      <span className="slider" />
      <span className="label-text">
        {isOn ? 'QU → ES' : 'ES → QU'}
      </span>
    </label>
  );
}
