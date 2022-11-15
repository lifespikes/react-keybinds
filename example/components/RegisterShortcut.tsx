import * as React from 'react';
import { useKeyShort } from '../../.';

const RegisterShortcut = () => {
  const { registerShortcut } = useKeyShort();

  const handleClickRegister = () => {
    registerShortcut({
      keys: {
        Mac: ['Shift', '*', '_'],
      },
      label: 'Other shortcut',
      callback: () => {
        // eslint-disable-next-line no-alert
        alert('Hello world');
      },
    });
  };

  return (
    <div>
      <button onClick={handleClickRegister}>Register shortcut</button>
    </div>
  );
};

export default RegisterShortcut;
