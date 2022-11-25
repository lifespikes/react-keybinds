import * as React from 'react';
import { useMemo, useState } from 'react';
import { ShortcutType, useKeyBind, useRegisterShortcut } from '../../.';
import inspire from '../data/inspire';

const RegisterOnMount = () => {
  const [text, setText] = useState(inspire[0]);

  const { getKeysByPlatform } = useKeyBind();

  const shortcut: ShortcutType = useMemo(
    () => ({
      keys: {
        Windows: ['Control', 'Enter'],
      },
      label: 'Inspired command',
      callback: () => {
        const randomIndex = Math.floor(Math.random() * inspire.length);
        setText(inspire[randomIndex]);
      },
    }),
    []
  );

  useRegisterShortcut(shortcut);

  const keysForInspire = getKeysByPlatform(shortcut);

  return (
    <div>
      <h1>Inspire command</h1>
      <p>
        Press: <strong>{keysForInspire?.keys?.join(' + ')}</strong>{' '}
      </p>
      <blockquote>{`"${text}"`}</blockquote>
    </div>
  );
};

export default RegisterOnMount;
