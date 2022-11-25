import * as React from 'react';
import { useKeyBind } from '../../.';

const RegisterShortcut = () => {
  const { registerShortcut } = useKeyBind();

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
      <h1>Register shortcut</h1>
      <button onClick={handleClickRegister}>Register shortcut</button>
    </div>
  );
};

export default RegisterShortcut;
