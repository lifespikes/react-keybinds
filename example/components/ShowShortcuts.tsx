import * as React from 'react';
import { useKeyBind } from '../../.';

const ShowShortcuts = () => {
  const { shortcuts } = useKeyBind();
  const shortcutsList = shortcuts?.map((shortcut, index) => {
    return (
      <div key={index}>
        <span>{shortcut.label}</span>
        <ul>
          {Object.entries(shortcut.keys).map(([key, values], i) => (
            <li key={`${key}-${i}`}>
              {key}: <strong>{values.join(' + ')}</strong>
            </li>
          ))}
        </ul>
      </div>
    );
  });
  return (
    <div>
      <h1>Registered Shortcuts</h1>
      {shortcutsList}
    </div>
  );
};

export default ShowShortcuts;
